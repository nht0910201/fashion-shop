import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Image } from '@nextui-org/react';

const slider = [
    'https://file.hstatic.net/1000184601/file/banner_d63b88808e864ec4a5174b34be8a029c.jpg',
    'https://file.hstatic.net/1000184601/collection/essential2_cb462794e7e84a9cbf5400f5f8bc73f0.jpg',
    'https://file.hstatic.net/1000184601/collection/banner_men_bdabcc70837a405389d87942821ff2e6.jpg',
    'https://file.hstatic.net/1000184601/collection/banner_women_71d0e5bced414bdc9d1ecc2fedd924a7.jpg',
    'https://file.hstatic.net/1000184601/collection/banner_outerwear_776b99c3343c45a79d9f0782c2b8bbb8.jpg',
];

function Home() {
    return (
        <>
            <Swiper
                autoplay={{
                    delay: 2500,
                    disableOnInteraction:false
                  }}
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
            >
                {slider.map((img, index) => (
                    <SwiperSlide key={index}><Image src={img} /></SwiperSlide>
                ))}
            </Swiper>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam quisquam placeat facilis quidem voluptatibus atque quae sapiente consequatur minus? Adipisci, voluptatem exercitationem. Necessitatibus, eveniet quia vel consequuntur quam repellendus aut!</p>
        </>
    );
}

export default Home;
