const breakpoints = {
    // Small devices (landscape phones, 576px and up)
    sm: 576,
    // Medium devices (tablets, 768px and up)
    md: 768,
    // Large devices (desktops, 992px and up)
    lg: 992,
    // Extra large devices (large desktops, 1200px and up)
    xl: 1200
};

export function breakpointUp(breakpoint) {
    return `@media (min-width: ${breakpoints[breakpoint]}px)`;
}

export default breakpoints;
