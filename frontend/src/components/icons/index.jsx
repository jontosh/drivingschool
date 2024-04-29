import button from "@/components/button/index.jsx";
import classNames from "classnames";
import IconStyle from "./icons.module.scss";

export const Icons = ({ className, type }) => {
  className = classNames([className, IconStyle["Icon-svg"]]);
  switch (type) {
    case "write-f":
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          <g clipPath="url(#clip0_3594_120560)">
            <path
              d="M18.1574 0.233068L18.6491 0.724735C19.3266 1.40307 19.2241 2.60557 18.4183 3.41057L8.27909 13.5497L4.99409 14.7514C4.58159 14.9031 4.17992 14.7064 4.09826 14.3139C4.07066 14.1715 4.08365 14.0242 4.13576 13.8889L5.36076 10.5756L15.4716 0.463901C16.2774 -0.341099 17.4799 -0.445266 18.1574 0.233068ZM7.83659 1.2414C7.94602 1.2414 8.05439 1.26296 8.15549 1.30483C8.2566 1.34671 8.34846 1.4081 8.42584 1.48548C8.50323 1.56286 8.56461 1.65473 8.60649 1.75583C8.64837 1.85694 8.66992 1.9653 8.66992 2.07473C8.66992 2.18417 8.64837 2.29253 8.60649 2.39364C8.56461 2.49474 8.50323 2.58661 8.42584 2.66399C8.34846 2.74137 8.2566 2.80276 8.15549 2.84463C8.05439 2.88651 7.94602 2.90807 7.83659 2.90807H4.50326C4.06123 2.90807 3.6373 3.08366 3.32474 3.39622C3.01218 3.70878 2.83659 4.13271 2.83659 4.57473V14.5747C2.83659 15.0168 3.01218 15.4407 3.32474 15.7532C3.6373 16.0658 4.06123 16.2414 4.50326 16.2414H14.5033C14.9453 16.2414 15.3692 16.0658 15.6818 15.7532C15.9943 15.4407 16.1699 15.0168 16.1699 14.5747V11.2414C16.1699 11.0204 16.2577 10.8084 16.414 10.6521C16.5703 10.4959 16.7822 10.4081 17.0033 10.4081C17.2243 10.4081 17.4362 10.4959 17.5925 10.6521C17.7488 10.8084 17.8366 11.0204 17.8366 11.2414V14.5747C17.8366 15.4588 17.4854 16.3066 16.8603 16.9318C16.2352 17.5569 15.3873 17.9081 14.5033 17.9081H4.50326C3.6192 17.9081 2.77135 17.5569 2.14623 16.9318C1.52111 16.3066 1.16992 15.4588 1.16992 14.5747V4.57473C1.16992 3.69068 1.52111 2.84283 2.14623 2.21771C2.77135 1.59259 3.6192 1.2414 4.50326 1.2414H7.83659Z"
              fill="black"
              className={IconStyle["path-primary"]}
            />
          </g>
          <defs>
            <clipPath id="clip0_3594_120560">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
      );
    case "buy":
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          <g className={IconStyle["path-primary"]}>
            <path d="M2.5 4.37503C2.33424 4.37503 2.17527 4.44087 2.05806 4.55808C1.94085 4.67529 1.875 4.83427 1.875 5.00003C1.875 5.16579 1.94085 5.32476 2.05806 5.44197C2.17527 5.55918 2.33424 5.62503 2.5 5.62503H3.8875L5.5275 12.1875C5.66687 12.7438 6.165 13.125 6.73812 13.125H14.5319C15.0962 13.125 15.5756 12.75 15.7238 12.2063L17.3438 6.25003H16.035L14.5312 11.875H6.7375L5.09812 5.31253C5.03041 5.04329 4.8743 4.80458 4.6548 4.6346C4.4353 4.46462 4.16511 4.37322 3.8875 4.37503H2.5ZM13.75 13.125C12.7219 13.125 11.875 13.9719 11.875 15C11.875 16.0282 12.7219 16.875 13.75 16.875C14.7781 16.875 15.625 16.0282 15.625 15C15.625 13.9719 14.7781 13.125 13.75 13.125ZM8.125 13.125C7.09688 13.125 6.25 13.9719 6.25 15C6.25 16.0282 7.09688 16.875 8.125 16.875C9.15312 16.875 10 16.0282 10 15C10 13.9719 9.15312 13.125 8.125 13.125ZM10 4.37503V7.50003H8.125L10.625 10L13.125 7.50003H11.25V4.37503H10ZM8.125 14.375C8.4775 14.375 8.75 14.6475 8.75 15C8.75 15.3525 8.4775 15.625 8.125 15.625C7.7725 15.625 7.5 15.3525 7.5 15C7.5 14.6475 7.7725 14.375 8.125 14.375ZM13.75 14.375C14.1025 14.375 14.375 14.6475 14.375 15C14.375 15.3525 14.1025 15.625 13.75 15.625C13.3975 15.625 13.125 15.3525 13.125 15C13.125 14.6475 13.3975 14.375 13.75 14.375Z" />
          </g>
        </svg>
      );
    case "checked":
      return (
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          <path
            d="M15 2.8125C8.25 2.8125 2.8125 8.25 2.8125 15C2.8125 21.75 8.25 27.1875 15 27.1875C21.75 27.1875 27.1875 21.75 27.1875 15C27.1875 13.6875 27.0112 12.3806 26.5425 11.1619L25.02 12.6562C25.2075 13.4062 25.3134 14.1562 25.3134 15C25.3134 20.7188 20.7197 25.3125 15.0009 25.3125C9.28219 25.3125 4.6875 20.7188 4.6875 15C4.6875 9.28125 9.28125 4.6875 15 4.6875C17.8125 4.6875 20.3381 5.80687 22.1194 7.58812L23.4375 6.27C21.2812 4.11375 18.2812 2.8125 15 2.8125ZM25.575 6.825L15 17.4028L10.9875 13.3903L9.6375 14.7375L14.325 19.425L15 20.0681L15.675 19.4241L26.925 8.17406L25.575 6.82406V6.825Z"
            fill="black"
          />
        </svg>
      );
    case "cross":
      return (
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          <path
            d="M21.0938 8.90625L8.90625 21.0938M8.90625 8.90625L21.0938 21.0938"
            stroke="#FF333F"
            strokeWidth="2.8125"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "password_broken":
      return (
        <svg
          width="18"
          height="16"
          viewBox="0 0 18 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path
              d="M9.00002 6.33398V9.66732M7.55669 7.16732L10.4434 8.83398M10.4434 7.16732L7.55585 8.83398M4.61002 6.33398V9.66732M3.16669 7.16732L6.05335 8.83398M6.05335 7.16732L3.16669 8.83398M13.39 6.33398V9.66732M11.9467 7.16732L14.8334 8.83398M14.8334 7.16732L11.9459 8.83398M17.3334 8.00065C17.3334 11.1432 17.3334 12.7148 16.3567 13.6907C15.3809 14.6673 13.8092 14.6673 10.6667 14.6673H7.33335C4.19085 14.6673 2.61919 14.6673 1.64335 13.6907C0.666687 12.7148 0.666687 11.1432 0.666687 8.00065C0.666687 4.85815 0.666687 3.28648 1.64335 2.31065C2.61919 1.33398 4.19085 1.33398 7.33335 1.33398H10.6667C13.8092 1.33398 15.3809 1.33398 16.3567 2.31065C16.9017 2.85482 17.1425 3.58398 17.2484 4.66732"
              stroke="black"
              strokeOpacity="0.45"
              strokeWidth="0.9375"
              strokeLinecap="round"
            />
          </g>
        </svg>
      );
    default:
      return <span className={"text-base"}>Not found Icon {type}</span>;
  }
};

const IconComponent = ({
  onClick,
  icon,
  className,
  children,
  spaceIcon,
  spaceIconX,
  spaceIconY,
  style,
  iconWidth,
  vertical,
  childrenClass,
  iconClass,
  ...props
}) => {
  className = classNames(className);
  return (
    <button
      onClick={onClick}
      className={className}
      type={"button"}
      style={style}
      {...props}
    >
      <div
        className={classNames(`inline-flex`, props.classNames, vertical, {
          [`gap-${spaceIcon}`]: !!spaceIcon,
          [`gap-x-${spaceIconX}`]: !!spaceIconX,
          [`gap-y-${spaceIconY}`]: !!spaceIconY,
        })}
      >
        <span className={classNames(iconWidth, iconClass)}>{icon}</span>
        <span className={childrenClass}>{children}</span>
      </div>
    </button>
  );
};

export default IconComponent;
