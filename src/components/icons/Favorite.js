
function Favorite({width, height, strokeColor, active}){
    let fill;
    let border = strokeColor;

    active ? fill = '#FFA82E' : fill ='none'
    active ? strokeColor = 'none' : strokeColor = border

    return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          viewBox="0 0 41 38"
          fill={fill}
          stroke={strokeColor}
          className="hover:fill-mainOrange-600 hover:stroke-mainOrange-600 cursor-pointer"
        >
          <path
            d="M20.5 6.55C15.122-1.78 0 .651 0 11.087c0 7.185 9.517 14.533 20.5 24.37C31.485 25.621 41 18.274 41 11.088 41 .617 25.838-1.717 20.5 6.549z">
            </path>
        </svg>
    );
}

export default Favorite;