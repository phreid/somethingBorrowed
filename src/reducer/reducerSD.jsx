//const navItems = '{"Landing Page":false, "Sign Up Page":false, "User Home":false, "Home Page":false, "Profile Page":false}'

const navItems = ["", "Landing Page", "Sign Up Page", "User Home", "Home Page", "Profile Page"]
const reducerNavBar = (content = navItems, action) => {
    return content;

};

export default reducerNavBar;

/**return content.map(n => {
                if (n === action.currPage) {
                    return <b>{n}</b>;
                    //return true;
                }
                return <text text={n}></text>;
            }); */