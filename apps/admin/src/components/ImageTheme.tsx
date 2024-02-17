import { ImageProps, getImageProps } from "next/image";

interface Props extends Omit<ImageProps, "src"> {
  srcDark: string;
  srcLight: string;
}

const ImageTheme = ({ alt, srcDark, srcLight, ...common }: Props) => {
  const {
    props: { srcSet: dark },
  } = getImageProps({ ...common, alt, src: srcDark });
  const {
    props: { srcSet: light, ...rest },
  } = getImageProps({ ...common, alt, src: srcLight });

  return (
    <picture>
      <source media="(prefers-color-scheme: dark)" srcSet={dark} />
      <source media="(prefers-color-scheme: light)" srcSet={light} />
      <img {...rest} alt={alt} />
    </picture>
  );
};

export default ImageTheme;
