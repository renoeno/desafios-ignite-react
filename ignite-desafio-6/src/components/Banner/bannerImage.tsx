import { Image } from "@chakra-ui/react";

export function BannerImage() {
  return (
    <Image
      src="/images/airplane.svg"
      marginTop="16"
      display={["none", "none", "inline-block"]}
    />
  );
}
