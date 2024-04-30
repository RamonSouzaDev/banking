import * as vue from 'vue';
import { Ref, EffectScope, ComponentPropsOptions, ExtractPropTypes } from 'vue';

interface ScrollStrategyData {
    root: Ref<HTMLElement | undefined>;
    contentEl: Ref<HTMLElement | undefined>;
    targetEl: Ref<HTMLElement | undefined>;
    isActive: Ref<boolean>;
    updateLocation: Ref<((e: Event) => void) | undefined>;
}
type ScrollStrategyFn = (data: ScrollStrategyData, props: StrategyProps$1, scope: EffectScope) => void;
declare const scrollStrategies: {
    none: null;
    close: typeof closeScrollStrategy;
    block: typeof blockScrollStrategy;
    reposition: typeof repositionScrollStrategy;
};
interface StrategyProps$1 {
    scrollStrategy: keyof typeof scrollStrategies | ScrollStrategyFn;
    contained: boolean | undefined;
}
declare function closeScrollStrategy(data: ScrollStrategyData): void;
declare function blockScrollStrategy(data: ScrollStrategyData, props: StrategyProps$1): void;
declare function repositionScrollStrategy(data: ScrollStrategyData, props: StrategyProps$1, scope: EffectScope): void;

declare class Box {
    x: number;
    y: number;
    width: number;
    height: number;
    constructor({ x, y, width, height }: {
        x: number;
        y: number;
        width: number;
        height: number;
    });
    get top(): number;
    get bottom(): number;
    get left(): number;
    get right(): number;
}

declare const block: readonly ["top", "bottom"];
declare const inline: readonly ["start", "end", "left", "right"];
type Tblock = typeof block[number];
type Tinline = typeof inline[number];
type Anchor = Tblock | Tinline | 'center' | 'center center' | `${Tblock} ${Tinline | 'center'}` | `${Tinline} ${Tblock | 'center'}`;

interface FilterPropsOptions<PropsOptions extends Readonly<ComponentPropsOptions>, Props = ExtractPropTypes<PropsOptions>> {
    filterProps<T extends Partial<Props>, U extends Exclude<keyof Props, Exclude<keyof Props, keyof T>>>(props: T): Partial<Pick<T, U>>;
}

interface LocationStrategyData {
    contentEl: Ref<HTMLElement | undefined>;
    target: Ref<HTMLElement | [x: number, y: number] | undefined>;
    isActive: Ref<boolean>;
    isRtl: Ref<boolean>;
}
type LocationStrategyFn = (data: LocationStrategyData, props: StrategyProps, contentStyles: Ref<Record<string, string>>) => undefined | {
    updateLocation: (e: Event) => void;
};
declare const locationStrategies: {
    static: typeof staticLocationStrategy;
    connected: typeof connectedLocationStrategy;
};
interface StrategyProps {
    locationStrategy: keyof typeof locationStrategies | LocationStrategyFn;
    location: Anchor;
    origin: Anchor | 'auto' | 'overlap';
    offset?: number | string | number[];
    maxHeight?: number | string;
    maxWidth?: number | string;
    minHeight?: number | string;
    minWidth?: number | string;
}
declare function staticLocationStrategy(): void;
declare function connectedLocationStrategy(data: LocationStrategyData, props: StrategyProps, contentStyles: Ref<Record<string, string>>): {
    updateLocation: () => {
        available: {
            x: number;
            y: number;
        };
        contentBox: Box;
    } | undefined;
};

declare const VSpeedDial: {
    new (...args: any[]): vue.CreateComponentPublicInstance<{
        offset: NonNullable<string | number | number[] | undefined>;
        location: NonNullable<Anchor>;
        origin: "auto" | Anchor | "overlap";
        minWidth: NonNullable<string | number>;
        transition: NonNullable<string | boolean | (vue.TransitionProps & {
            component?: vue.Component | undefined;
        })>;
        zIndex: string | number;
        style: vue.StyleValue;
        eager: boolean;
        disabled: boolean;
        modelValue: boolean;
        locationStrategy: NonNullable<"connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
            updateLocation: (e: Event) => void;
        } | undefined)>;
        scrollStrategy: NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition">;
        closeDelay: NonNullable<string | number>;
        openDelay: NonNullable<string | number>;
        activatorProps: Record<string, any>;
        openOnHover: boolean;
        closeOnContentClick: boolean;
        closeOnBack: boolean;
        contained: boolean;
        noClickAnimation: boolean;
        persistent: boolean;
        scrim: NonNullable<string | boolean>;
    } & {
        id?: string | undefined;
        height?: string | number | undefined;
        width?: string | number | undefined;
        maxHeight?: string | number | undefined;
        maxWidth?: string | number | undefined;
        minHeight?: string | number | undefined;
        opacity?: string | number | undefined;
        target?: Element | "cursor" | "parent" | (string & {}) | vue.ComponentPublicInstance | [x: number, y: number] | undefined;
        class?: any;
        theme?: string | undefined;
        contentClass?: any;
        activator?: Element | "parent" | (string & {}) | vue.ComponentPublicInstance | undefined;
        openOnClick?: boolean | undefined;
        openOnFocus?: boolean | undefined;
        contentProps?: any;
        attach?: string | boolean | Element | undefined;
    } & {
        $children?: vue.VNodeChild | {
            default?: ((arg: {
                isActive: vue.Ref<boolean>;
            }) => vue.VNodeChild) | undefined;
            activator?: ((arg: {
                isActive: boolean;
                props: Record<string, any>;
            }) => vue.VNodeChild) | undefined;
        } | ((arg: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNodeChild);
        'v-slots'?: {
            default?: false | ((arg: {
                isActive: vue.Ref<boolean>;
            }) => vue.VNodeChild) | undefined;
            activator?: false | ((arg: {
                isActive: boolean;
                props: Record<string, any>;
            }) => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:default"?: false | ((arg: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNodeChild) | undefined;
        "v-slot:activator"?: false | ((arg: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
    }, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & {
        offset: NonNullable<string | number | number[] | undefined>;
        location: NonNullable<Anchor>;
        origin: "auto" | Anchor | "overlap";
        minWidth: NonNullable<string | number>;
        transition: NonNullable<string | boolean | (vue.TransitionProps & {
            component?: vue.Component | undefined;
        })>;
        zIndex: string | number;
        style: vue.StyleValue;
        eager: boolean;
        disabled: boolean;
        modelValue: boolean;
        locationStrategy: NonNullable<"connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
            updateLocation: (e: Event) => void;
        } | undefined)>;
        scrollStrategy: NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition">;
        closeDelay: NonNullable<string | number>;
        openDelay: NonNullable<string | number>;
        activatorProps: Record<string, any>;
        openOnHover: boolean;
        closeOnContentClick: boolean;
        closeOnBack: boolean;
        contained: boolean;
        noClickAnimation: boolean;
        persistent: boolean;
        scrim: NonNullable<string | boolean>;
    } & {
        id?: string | undefined;
        height?: string | number | undefined;
        width?: string | number | undefined;
        maxHeight?: string | number | undefined;
        maxWidth?: string | number | undefined;
        minHeight?: string | number | undefined;
        opacity?: string | number | undefined;
        target?: Element | "cursor" | "parent" | (string & {}) | vue.ComponentPublicInstance | [x: number, y: number] | undefined;
        class?: any;
        theme?: string | undefined;
        contentClass?: any;
        activator?: Element | "parent" | (string & {}) | vue.ComponentPublicInstance | undefined;
        openOnClick?: boolean | undefined;
        openOnFocus?: boolean | undefined;
        contentProps?: any;
        attach?: string | boolean | Element | undefined;
    } & {
        $children?: vue.VNodeChild | {
            default?: ((arg: {
                isActive: vue.Ref<boolean>;
            }) => vue.VNodeChild) | undefined;
            activator?: ((arg: {
                isActive: boolean;
                props: Record<string, any>;
            }) => vue.VNodeChild) | undefined;
        } | ((arg: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNodeChild);
        'v-slots'?: {
            default?: false | ((arg: {
                isActive: vue.Ref<boolean>;
            }) => vue.VNodeChild) | undefined;
            activator?: false | ((arg: {
                isActive: boolean;
                props: Record<string, any>;
            }) => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:default"?: false | ((arg: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNodeChild) | undefined;
        "v-slot:activator"?: false | ((arg: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
    }, {
        offset: NonNullable<string | number | number[] | undefined>;
        location: NonNullable<Anchor>;
        origin: "auto" | Anchor | "overlap";
        minWidth: NonNullable<string | number>;
        transition: NonNullable<string | boolean | (vue.TransitionProps & {
            component?: vue.Component | undefined;
        })>;
        zIndex: string | number;
        style: vue.StyleValue;
        eager: boolean;
        disabled: boolean;
        modelValue: boolean;
        locationStrategy: NonNullable<"connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
            updateLocation: (e: Event) => void;
        } | undefined)>;
        scrollStrategy: NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition">;
        closeDelay: NonNullable<string | number>;
        openDelay: NonNullable<string | number>;
        activatorProps: Record<string, any>;
        openOnClick: boolean;
        openOnHover: boolean;
        openOnFocus: boolean;
        closeOnContentClick: boolean;
        closeOnBack: boolean;
        contained: boolean;
        noClickAnimation: boolean;
        persistent: boolean;
        scrim: NonNullable<string | boolean>;
    }, true, {}, vue.SlotsType<Partial<{
        default: (arg: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[];
        activator: (arg: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
            [key: string]: any;
        }>[];
    }>>, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, {
        offset: NonNullable<string | number | number[] | undefined>;
        location: NonNullable<Anchor>;
        origin: "auto" | Anchor | "overlap";
        minWidth: NonNullable<string | number>;
        transition: NonNullable<string | boolean | (vue.TransitionProps & {
            component?: vue.Component | undefined;
        })>;
        zIndex: string | number;
        style: vue.StyleValue;
        eager: boolean;
        disabled: boolean;
        modelValue: boolean;
        locationStrategy: NonNullable<"connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
            updateLocation: (e: Event) => void;
        } | undefined)>;
        scrollStrategy: NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition">;
        closeDelay: NonNullable<string | number>;
        openDelay: NonNullable<string | number>;
        activatorProps: Record<string, any>;
        openOnHover: boolean;
        closeOnContentClick: boolean;
        closeOnBack: boolean;
        contained: boolean;
        noClickAnimation: boolean;
        persistent: boolean;
        scrim: NonNullable<string | boolean>;
    } & {
        id?: string | undefined;
        height?: string | number | undefined;
        width?: string | number | undefined;
        maxHeight?: string | number | undefined;
        maxWidth?: string | number | undefined;
        minHeight?: string | number | undefined;
        opacity?: string | number | undefined;
        target?: Element | "cursor" | "parent" | (string & {}) | vue.ComponentPublicInstance | [x: number, y: number] | undefined;
        class?: any;
        theme?: string | undefined;
        contentClass?: any;
        activator?: Element | "parent" | (string & {}) | vue.ComponentPublicInstance | undefined;
        openOnClick?: boolean | undefined;
        openOnFocus?: boolean | undefined;
        contentProps?: any;
        attach?: string | boolean | Element | undefined;
    } & {
        $children?: vue.VNodeChild | {
            default?: ((arg: {
                isActive: vue.Ref<boolean>;
            }) => vue.VNodeChild) | undefined;
            activator?: ((arg: {
                isActive: boolean;
                props: Record<string, any>;
            }) => vue.VNodeChild) | undefined;
        } | ((arg: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNodeChild);
        'v-slots'?: {
            default?: false | ((arg: {
                isActive: vue.Ref<boolean>;
            }) => vue.VNodeChild) | undefined;
            activator?: false | ((arg: {
                isActive: boolean;
                props: Record<string, any>;
            }) => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:default"?: false | ((arg: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNodeChild) | undefined;
        "v-slot:activator"?: false | ((arg: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
    }, {}, {}, {}, {}, {
        offset: NonNullable<string | number | number[] | undefined>;
        location: NonNullable<Anchor>;
        origin: "auto" | Anchor | "overlap";
        minWidth: NonNullable<string | number>;
        transition: NonNullable<string | boolean | (vue.TransitionProps & {
            component?: vue.Component | undefined;
        })>;
        zIndex: string | number;
        style: vue.StyleValue;
        eager: boolean;
        disabled: boolean;
        modelValue: boolean;
        locationStrategy: NonNullable<"connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
            updateLocation: (e: Event) => void;
        } | undefined)>;
        scrollStrategy: NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition">;
        closeDelay: NonNullable<string | number>;
        openDelay: NonNullable<string | number>;
        activatorProps: Record<string, any>;
        openOnClick: boolean;
        openOnHover: boolean;
        openOnFocus: boolean;
        closeOnContentClick: boolean;
        closeOnBack: boolean;
        contained: boolean;
        noClickAnimation: boolean;
        persistent: boolean;
        scrim: NonNullable<string | boolean>;
    }>;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & vue.ComponentOptionsBase<{
    offset: NonNullable<string | number | number[] | undefined>;
    location: NonNullable<Anchor>;
    origin: "auto" | Anchor | "overlap";
    minWidth: NonNullable<string | number>;
    transition: NonNullable<string | boolean | (vue.TransitionProps & {
        component?: vue.Component | undefined;
    })>;
    zIndex: string | number;
    style: vue.StyleValue;
    eager: boolean;
    disabled: boolean;
    modelValue: boolean;
    locationStrategy: NonNullable<"connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
        updateLocation: (e: Event) => void;
    } | undefined)>;
    scrollStrategy: NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition">;
    closeDelay: NonNullable<string | number>;
    openDelay: NonNullable<string | number>;
    activatorProps: Record<string, any>;
    openOnHover: boolean;
    closeOnContentClick: boolean;
    closeOnBack: boolean;
    contained: boolean;
    noClickAnimation: boolean;
    persistent: boolean;
    scrim: NonNullable<string | boolean>;
} & {
    id?: string | undefined;
    height?: string | number | undefined;
    width?: string | number | undefined;
    maxHeight?: string | number | undefined;
    maxWidth?: string | number | undefined;
    minHeight?: string | number | undefined;
    opacity?: string | number | undefined;
    target?: Element | "cursor" | "parent" | (string & {}) | vue.ComponentPublicInstance | [x: number, y: number] | undefined;
    class?: any;
    theme?: string | undefined;
    contentClass?: any;
    activator?: Element | "parent" | (string & {}) | vue.ComponentPublicInstance | undefined;
    openOnClick?: boolean | undefined;
    openOnFocus?: boolean | undefined;
    contentProps?: any;
    attach?: string | boolean | Element | undefined;
} & {
    $children?: vue.VNodeChild | {
        default?: ((arg: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNodeChild) | undefined;
        activator?: ((arg: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
    } | ((arg: {
        isActive: vue.Ref<boolean>;
    }) => vue.VNodeChild);
    'v-slots'?: {
        default?: false | ((arg: {
            isActive: vue.Ref<boolean>;
        }) => vue.VNodeChild) | undefined;
        activator?: false | ((arg: {
            isActive: boolean;
            props: Record<string, any>;
        }) => vue.VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | ((arg: {
        isActive: vue.Ref<boolean>;
    }) => vue.VNodeChild) | undefined;
    "v-slot:activator"?: false | ((arg: {
        isActive: boolean;
        props: Record<string, any>;
    }) => vue.VNodeChild) | undefined;
}, {}, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Record<string, any>, string, {
    offset: NonNullable<string | number | number[] | undefined>;
    location: NonNullable<Anchor>;
    origin: "auto" | Anchor | "overlap";
    minWidth: NonNullable<string | number>;
    transition: NonNullable<string | boolean | (vue.TransitionProps & {
        component?: vue.Component | undefined;
    })>;
    zIndex: string | number;
    style: vue.StyleValue;
    eager: boolean;
    disabled: boolean;
    modelValue: boolean;
    locationStrategy: NonNullable<"connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
        updateLocation: (e: Event) => void;
    } | undefined)>;
    scrollStrategy: NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition">;
    closeDelay: NonNullable<string | number>;
    openDelay: NonNullable<string | number>;
    activatorProps: Record<string, any>;
    openOnClick: boolean;
    openOnHover: boolean;
    openOnFocus: boolean;
    closeOnContentClick: boolean;
    closeOnBack: boolean;
    contained: boolean;
    noClickAnimation: boolean;
    persistent: boolean;
    scrim: NonNullable<string | boolean>;
}, {}, string, vue.SlotsType<Partial<{
    default: (arg: {
        isActive: vue.Ref<boolean>;
    }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
    activator: (arg: {
        isActive: boolean;
        props: Record<string, any>;
    }) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>[];
}>>> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & FilterPropsOptions<{
    transition: Omit<{
        type: vue.PropType<string | boolean | (vue.TransitionProps & {
            component?: vue.Component | undefined;
        })>;
        default: string;
        validator: (val: unknown) => boolean;
    }, "type" | "default"> & {
        type: vue.PropType<NonNullable<string | boolean | (vue.TransitionProps & {
            component?: vue.Component | undefined;
        })>>;
        default: NonNullable<string | boolean | (vue.TransitionProps & {
            component?: vue.Component | undefined;
        })>;
    };
    offset: {
        type: vue.PropType<NonNullable<string | number | number[] | undefined>>;
        default: NonNullable<string | number | number[] | undefined>;
    };
    location: Omit<{
        type: vue.PropType<Anchor>;
        default: string;
    }, "type" | "default"> & {
        type: vue.PropType<NonNullable<Anchor>>;
        default: NonNullable<Anchor>;
    };
    origin: {
        type: vue.PropType<"auto" | Anchor | "overlap">;
        default: string;
    };
    height: (StringConstructor | NumberConstructor)[];
    width: (StringConstructor | NumberConstructor)[];
    maxHeight: (StringConstructor | NumberConstructor)[];
    maxWidth: (StringConstructor | NumberConstructor)[];
    minHeight: (StringConstructor | NumberConstructor)[];
    minWidth: {
        type: vue.PropType<NonNullable<string | number>>;
        default: NonNullable<string | number>;
    };
    opacity: (StringConstructor | NumberConstructor)[];
    zIndex: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    style: {
        type: vue.PropType<vue.StyleValue>;
        default: null;
    };
    target: vue.PropType<Element | "cursor" | "parent" | (string & {}) | vue.ComponentPublicInstance | [x: number, y: number] | undefined>;
    eager: BooleanConstructor;
    disabled: BooleanConstructor;
    class: vue.PropType<any>;
    theme: StringConstructor;
    modelValue: BooleanConstructor;
    contentClass: null;
    activator: vue.PropType<Element | "parent" | (string & {}) | vue.ComponentPublicInstance | undefined>;
    locationStrategy: Omit<{
        type: vue.PropType<"connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
            updateLocation: (e: Event) => void;
        } | undefined)>;
        default: string;
        validator: (val: any) => boolean;
    }, "type" | "default"> & {
        type: vue.PropType<NonNullable<"connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
            updateLocation: (e: Event) => void;
        } | undefined)>>;
        default: NonNullable<"connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
            updateLocation: (e: Event) => void;
        } | undefined)>;
    };
    scrollStrategy: Omit<{
        type: vue.PropType<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition">;
        default: string;
        validator: (val: any) => boolean;
    }, "type" | "default"> & {
        type: vue.PropType<NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition">>;
        default: NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition">;
    };
    closeDelay: {
        type: vue.PropType<NonNullable<string | number>>;
        default: NonNullable<string | number>;
    };
    openDelay: {
        type: vue.PropType<NonNullable<string | number>>;
        default: NonNullable<string | number>;
    };
    activatorProps: {
        type: vue.PropType<Record<string, any>>;
        default: () => {};
    };
    openOnClick: {
        type: BooleanConstructor;
        default: undefined;
    };
    openOnHover: BooleanConstructor;
    openOnFocus: {
        type: BooleanConstructor;
        default: undefined;
    };
    closeOnContentClick: {
        type: vue.PropType<boolean>;
        default: boolean;
    };
    closeOnBack: {
        type: BooleanConstructor;
        default: boolean;
    };
    contained: BooleanConstructor;
    contentProps: null;
    noClickAnimation: BooleanConstructor;
    persistent: BooleanConstructor;
    scrim: Omit<{
        type: (StringConstructor | BooleanConstructor)[];
        default: boolean;
    }, "type" | "default"> & {
        type: vue.PropType<NonNullable<string | boolean>>;
        default: NonNullable<string | boolean>;
    };
    attach: vue.PropType<string | boolean | Element>;
    id: StringConstructor;
}, vue.ExtractPropTypes<{
    transition: Omit<{
        type: vue.PropType<string | boolean | (vue.TransitionProps & {
            component?: vue.Component | undefined;
        })>;
        default: string;
        validator: (val: unknown) => boolean;
    }, "type" | "default"> & {
        type: vue.PropType<NonNullable<string | boolean | (vue.TransitionProps & {
            component?: vue.Component | undefined;
        })>>;
        default: NonNullable<string | boolean | (vue.TransitionProps & {
            component?: vue.Component | undefined;
        })>;
    };
    offset: {
        type: vue.PropType<NonNullable<string | number | number[] | undefined>>;
        default: NonNullable<string | number | number[] | undefined>;
    };
    location: Omit<{
        type: vue.PropType<Anchor>;
        default: string;
    }, "type" | "default"> & {
        type: vue.PropType<NonNullable<Anchor>>;
        default: NonNullable<Anchor>;
    };
    origin: {
        type: vue.PropType<"auto" | Anchor | "overlap">;
        default: string;
    };
    height: (StringConstructor | NumberConstructor)[];
    width: (StringConstructor | NumberConstructor)[];
    maxHeight: (StringConstructor | NumberConstructor)[];
    maxWidth: (StringConstructor | NumberConstructor)[];
    minHeight: (StringConstructor | NumberConstructor)[];
    minWidth: {
        type: vue.PropType<NonNullable<string | number>>;
        default: NonNullable<string | number>;
    };
    opacity: (StringConstructor | NumberConstructor)[];
    zIndex: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    style: {
        type: vue.PropType<vue.StyleValue>;
        default: null;
    };
    target: vue.PropType<Element | "cursor" | "parent" | (string & {}) | vue.ComponentPublicInstance | [x: number, y: number] | undefined>;
    eager: BooleanConstructor;
    disabled: BooleanConstructor;
    class: vue.PropType<any>;
    theme: StringConstructor;
    modelValue: BooleanConstructor;
    contentClass: null;
    activator: vue.PropType<Element | "parent" | (string & {}) | vue.ComponentPublicInstance | undefined>;
    locationStrategy: Omit<{
        type: vue.PropType<"connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
            updateLocation: (e: Event) => void;
        } | undefined)>;
        default: string;
        validator: (val: any) => boolean;
    }, "type" | "default"> & {
        type: vue.PropType<NonNullable<"connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
            updateLocation: (e: Event) => void;
        } | undefined)>>;
        default: NonNullable<"connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
            updateLocation: (e: Event) => void;
        } | undefined)>;
    };
    scrollStrategy: Omit<{
        type: vue.PropType<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition">;
        default: string;
        validator: (val: any) => boolean;
    }, "type" | "default"> & {
        type: vue.PropType<NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition">>;
        default: NonNullable<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1, scope: vue.EffectScope) => void) | "reposition">;
    };
    closeDelay: {
        type: vue.PropType<NonNullable<string | number>>;
        default: NonNullable<string | number>;
    };
    openDelay: {
        type: vue.PropType<NonNullable<string | number>>;
        default: NonNullable<string | number>;
    };
    activatorProps: {
        type: vue.PropType<Record<string, any>>;
        default: () => {};
    };
    openOnClick: {
        type: BooleanConstructor;
        default: undefined;
    };
    openOnHover: BooleanConstructor;
    openOnFocus: {
        type: BooleanConstructor;
        default: undefined;
    };
    closeOnContentClick: {
        type: vue.PropType<boolean>;
        default: boolean;
    };
    closeOnBack: {
        type: BooleanConstructor;
        default: boolean;
    };
    contained: BooleanConstructor;
    contentProps: null;
    noClickAnimation: BooleanConstructor;
    persistent: BooleanConstructor;
    scrim: Omit<{
        type: (StringConstructor | BooleanConstructor)[];
        default: boolean;
    }, "type" | "default"> & {
        type: vue.PropType<NonNullable<string | boolean>>;
        default: NonNullable<string | boolean>;
    };
    attach: vue.PropType<string | boolean | Element>;
    id: StringConstructor;
}>>;
type VSpeedDial = InstanceType<typeof VSpeedDial>;

export { VSpeedDial };
