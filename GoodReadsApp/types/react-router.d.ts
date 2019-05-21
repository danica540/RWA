export class MemoryRouter {
    constructor(...args: any[]);
    componentDidMount(): void;
    forceUpdate(callback: any): void;
    render(): any;
    setState(partialState: any, callback: any): void;
}
export namespace MemoryRouter {
    namespace propTypes {
        function children(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace children {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
        function getUserConfirmation(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace getUserConfirmation {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
        function initialEntries(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace initialEntries {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
        function initialIndex(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace initialIndex {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
        function keyLength(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace keyLength {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
    }
}
export function Prompt(_ref: any): any;
export namespace Prompt {
    namespace propTypes {
        function message(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        function when(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace when {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
    }
}
export function Redirect(_ref: any): any;
export namespace Redirect {
    namespace propTypes {
        function from(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace from {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
        function push(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace push {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
        function to(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
}
export class Route {
    constructor(...args: any[]);
    componentDidMount(): void;
    componentDidUpdate(prevProps: any): void;
    forceUpdate(callback: any): void;
    render(): any;
    setState(partialState: any, callback: any): void;
}
export namespace Route {
    namespace propTypes {
        function children(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace children {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
        function component(props: any, propName: any): any;
        function exact(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace exact {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
        function location(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace location {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
        function path(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace path {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
        function render(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace render {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
        function sensitive(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace sensitive {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
        function strict(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace strict {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
    }
}
export class Router {
    static computeRootMatch(pathname: any): any;
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(prevProps: any): void;
    componentWillUnmount(): void;
    forceUpdate(callback: any): void;
    render(): any;
    setState(partialState: any, callback: any): void;
}
export namespace Router {
    namespace propTypes {
        function children(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace children {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
        function history(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        function staticContext(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace staticContext {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
    }
}
export class StaticRouter {
    constructor(...args: any[]);
    componentDidMount(): void;
    forceUpdate(callback: any): void;
    navigateTo(location: any, action: any): void;
    render(): any;
    setState(partialState: any, callback: any): void;
}
export namespace StaticRouter {
    namespace propTypes {
        function basename(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace basename {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
        function context(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace context {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
        function location(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace location {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
    }
}
export class Switch {
    constructor(...args: any[]);
    componentDidUpdate(prevProps: any): void;
    forceUpdate(callback: any): void;
    render(): any;
    setState(partialState: any, callback: any): void;
}
export namespace Switch {
    namespace propTypes {
        function children(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace children {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
        function location(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace location {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
    }
}
export function generatePath(path: any, params: any): any;
export function matchPath(pathname: any, options: any): any;
export function withRouter(Component: any): any;
