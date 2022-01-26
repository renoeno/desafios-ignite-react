// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import Swiper core and required modules
import SwiperCore, {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
} from "swiper";
import { Heading, Image, Text } from "@chakra-ui/react";

import styles from "./Carousel.module.css";

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Mousewheel, Keyboard]);

export default function Carousel() {
  return (
    <>
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        className={styles.swiper}
        style={{ "--swiper-theme-color": "#FFBA08" }}
      >
        <SwiperSlide className={styles.swiperSlide}>
          <Image
            src="/images/continents/europe.jpg"
            opacity="0.35"
            backgroundColor="black"
          />
          <span>
            <Link href="/continentes/europa">
              <a>
                <Heading color="gray.50">Europa</Heading>
                <Text color="gray.50" fontWeight="600">
                  O continente mais antigo.
                </Text>
              </a>
            </Link>
          </span>
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <Image
            src="/images/continents/africa.jpg"
            opacity="0.35"
            backgroundColor="black"
          />
          <span>
            <Link href="/continentes/africa">
              <a>
                <Heading color="gray.50">África</Heading>
                <Text color="gray.50" fontWeight="600">
                  The founding fathers.
                </Text>
              </a>
            </Link>
          </span>
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <Image
            src="/images/continents/south-america.jpg"
            opacity="0.35"
            backgroundColor="black"
          />
          <span>
            <Link href="/continentes/america-do-sul">
              <a>
                <Heading color="gray.50">América do Sul</Heading>
                <Text color="gray.50" fontWeight="600">
                  Belezas tropicais.
                </Text>
              </a>
            </Link>
          </span>
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <Image
            src="/images/continents/central-america.jpg"
            opacity="0.35"
            backgroundColor="black"
          />
          <span>
            <Link href="/continentes/america-central">
              <a>
                <Heading color="gray.50">América Central</Heading>
                <Text color="gray.50" fontWeight="600">
                  Belezas do caribe.
                </Text>
              </a>
            </Link>
          </span>
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <Image
            src="/images/continents/north-america.jpg"
            opacity="0.35"
            backgroundColor="black"
          />
          <span>
            <Link href="/continentes/america-do-norte">
              <a>
                <Heading color="gray.50">América do Norte</Heading>
                <Text color="gray.50" fontWeight="600">
                  Dos desertos às florestas.
                </Text>
              </a>
            </Link>
          </span>
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <Image
            src="/images/continents/asia.jpg"
            opacity="0.35"
            backgroundColor="black"
          />
          <span>
            <Link href="/continentes/asia">
              <a>
                <Heading color="gray.50">Ásia</Heading>
                <Text color="gray.50" fontWeight="600">
                  O outro lado do seu mundo.
                </Text>
              </a>
            </Link>
          </span>
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <Image
            src="/images/continents/oceania.jpg"
            opacity="0.35"
            backgroundColor="black"
          />
          <span>
            <Link href="/continentes/oceania">
              <a>
                <Heading color="gray.50">Oceania</Heading>
                <Text color="gray.50" fontWeight="600">
                  O igual exótico.
                </Text>
              </a>
            </Link>
          </span>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
