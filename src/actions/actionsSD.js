const navItems = '{"Landing Page":false, "Sign Up Page":false, "User Home":false, "Home Page":false, "Profile Page":false}'

export const updateNavItem = (c) => {
    return {
        type: 'NavItem',
        currPage: c
    };
	
};
