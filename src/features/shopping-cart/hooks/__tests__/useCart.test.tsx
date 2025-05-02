import { renderHook, act } from "@testing-library/react-hooks";
import useCart from "../useCart";
import { Product } from "../../../../types/product";
import { JSDOM } from "jsdom";
import { TextEncoder, TextDecoder } from "util";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;

const dom = new JSDOM('<!DOCTYPE html><p id="root"></p>');
global.window = dom.window as any;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
} as any;

// ... restante do seu arquivo de teste

const mockProducts: Product[] = [
  { id: 1, name: "Produto 1", color: "Vermelho", price: 10, descricao: "" },
  { id: 2, name: "Produto 2", color: "Azul", price: 20, descricao: "" },
];

describe("useCart Hook", () => {
  beforeEach(() => {
    localStorage.clear(); // Limpa o localStorage antes de cada teste
  });

  test("should initialize with an empty cart if no data in localStorage", () => {
    const { result } = renderHook(() => useCart(mockProducts));
    expect(result.current.cartItems).toEqual([]);
  });

  test("should initialize with data from localStorage if present", () => {
    const initialCart = [{ id: 1, quantity: 2 }];
    localStorage.setItem("catalogoBarbantesCart", JSON.stringify(initialCart));
    const { result } = renderHook(() => useCart(mockProducts));
    expect(result.current.cartItems).toEqual(initialCart);
  });

  test("handleAddToCart should add a new item to the cart", () => {
    const { result } = renderHook(() => useCart(mockProducts));
    act(() => {
      result.current.handleAddToCart(1);
    });
    expect(result.current.cartItems).toEqual([{ id: 1, quantity: 1 }]);
  });

  test("handleAddToCart should increment quantity if item already exists", () => {
    const { result } = renderHook(() => useCart(mockProducts));
    act(() => {
      result.current.handleAddToCart(1);
    });
    act(() => {
      result.current.handleAddToCart(1);
    });
    expect(result.current.cartItems).toEqual([{ id: 1, quantity: 2 }]);
  });

  test("handleQuantityChange should update the quantity of an existing item", () => {
    const { result } = renderHook(() => useCart(mockProducts));
    act(() => {
      result.current.handleAddToCart(1);
    });
    act(() => {
      result.current.handleQuantityChange(1, 3);
    });
    expect(result.current.cartItems).toEqual([{ id: 1, quantity: 3 }]);
  });

  test("handleEmptyCart should clear the cart", () => {
    const { result } = renderHook(() => useCart(mockProducts));
    act(() => {
      result.current.handleAddToCart(1);
    });
    act(() => {
      result.current.handleEmptyCart();
    });
    expect(result.current.cartItems).toEqual([]);
  });

  test("calculateTotal should return the correct total price", () => {
    const { result } = renderHook(() => useCart(mockProducts));
    act(() => {
      result.current.handleAddToCart(1); // Produto 1: $10
    });
    act(() => {
      result.current.handleAddToCart(2); // Produto 2: $20
    });
    act(() => {
      result.current.handleQuantityChange(1, 2); // 2 x $10 = $20
    });
    expect(result.current.calculateTotal()).toBe("40.00");
  });

  test("should save cart items to localStorage on update", () => {
    const { result } = renderHook(() => useCart(mockProducts));
    act(() => {
      result.current.handleAddToCart(1);
    });
    expect(localStorage.getItem("catalogoBarbantesCart")).toBe(
      JSON.stringify([{ id: 1, quantity: 1 }])
    );
  });
});
