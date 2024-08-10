import classNames from "classnames";
import { Fragment } from "react";
import ImageStyle from "./image.module.scss";

const Image = ({ className, srcSet, type, src, alt, title, ...props }) => {
  className = classNames([className, ImageStyle["Image"]]);
  return (
    <Fragment>
      <picture className={className} {...props}>
        <source srcSet={srcSet} type={type} />
        <img
          loading={"lazy"}
          src={src}
          alt={alt}
          title={title}
          className={`object-cover`}
        />
      </picture>
    </Fragment>
  );
};

export default Image;
