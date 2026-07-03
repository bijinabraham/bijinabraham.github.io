import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { act, render } from "@testing-library/react";
import { useReveal } from "./useReveal";

type ObserverCallback = (entries: Array<{ isIntersecting: boolean }>) => void;

class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = [];
  callback: ObserverCallback;
  observed: Element[] = [];
  disconnected = false;
  options: IntersectionObserverInit | undefined;

  constructor(cb: ObserverCallback, options?: IntersectionObserverInit) {
    this.callback = cb;
    this.options = options;
    MockIntersectionObserver.instances.push(this);
  }

  observe(el: Element) {
    this.observed.push(el);
  }

  disconnect() {
    this.disconnected = true;
  }

  unobserve() {}
  takeRecords() {
    return [];
  }

  trigger(isIntersecting: boolean) {
    this.callback([{ isIntersecting }]);
  }
}

function Probe({ threshold, onState }: { threshold?: number; onState: (seen: boolean) => void }) {
  const { ref, seen } = useReveal<HTMLDivElement>(threshold);
  onState(seen);
  return <div ref={ref} data-testid="probe" />;
}

describe("useReveal", () => {
  beforeEach(() => {
    MockIntersectionObserver.instances = [];
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("starts with seen=false and registers the element with the observer", () => {
    let latest = true;
    render(<Probe onState={(s) => (latest = s)} />);
    expect(latest).toBe(false);
    const inst = MockIntersectionObserver.instances.at(-1)!;
    expect(inst.observed).toHaveLength(1);
  });

  it("flips seen to true when the observer reports intersection, then disconnects", () => {
    let latest = false;
    render(<Probe onState={(s) => (latest = s)} />);
    const inst = MockIntersectionObserver.instances.at(-1)!;

    act(() => {
      inst.trigger(true);
    });

    expect(latest).toBe(true);
    expect(inst.disconnected).toBe(true);
  });

  it("does not flip seen when intersection is false", () => {
    let latest = true;
    render(<Probe onState={(s) => (latest = s)} />);
    const inst = MockIntersectionObserver.instances.at(-1)!;
    act(() => {
      inst.trigger(false);
    });
    expect(latest).toBe(false);
    expect(inst.disconnected).toBe(false);
  });

  it("passes the threshold option through to IntersectionObserver", () => {
    render(<Probe threshold={0.55} onState={() => {}} />);
    const inst = MockIntersectionObserver.instances.at(-1)!;
    expect(inst.options?.threshold).toBe(0.55);
  });

  it("defaults threshold to 0.2 when none is provided", () => {
    render(<Probe onState={() => {}} />);
    const inst = MockIntersectionObserver.instances.at(-1)!;
    expect(inst.options?.threshold).toBe(0.2);
  });

  it("falls back to seen=true when IntersectionObserver is unavailable", () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    let latest = false;
    render(<Probe onState={(s) => (latest = s)} />);
    expect(latest).toBe(true);
  });
});
