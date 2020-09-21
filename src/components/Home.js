import React from 'react';
import '../styles/Home.css';
import Product from './Product';

function Home() {
  return (
    <div className="home">
      <img
        src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
        alt=""
        className="home__image"
      />
      <div className="home_productSection">
        <Product
          id={12345}
          title="Microsoft Surface Pro 4 256GB i5 Windows 10 Anniversary with Black Type Cover Bundle (8GB RAM, 2.4GHz i5, 12.3 Inch Touchscreen) (Renewed)"
          price={699.0}
          rating={3}
          image="https://images-na.ssl-images-amazon.com/images/I/41HKnX6VWqL._AC_.jpg"
        />
        <Product
          id={12346}
          title="Acer Aspire 5 Slim Laptop, 15.6 inches Full HD IPS Display, AMD Ryzen 3"
          price={349.99}
          rating={4}
          image="https://images-na.ssl-images-amazon.com/images/I/81vNRgHlqGL._AC_SL1500_.jpg"
        />
        <Product
          id={12347}
          title="Dell XPS 13 7390 13.3 inch 4K UHD InfinityEdge Touchscreen Laptop (Silver) 10th Gen Intel Core i7-10710U, 16GB RAM, 1TB SSD, Windows 10 Home Advance (XPS7390-7681SLV-PUS)"
          price={1604.98}
          rating={5}
          image="https://images-na.ssl-images-amazon.com/images/I/81v6VrI9ZML._AC_SL1500_.jpg"
        />
        <Product
          id={12348}
          title="ASUS VivoBook 15 Thin and Light Laptop, 15.6” FHD Display, Intel i3-1005G1 CPU, 8GB RAM, 128GB SSD, Backlit Keyboard, Fingerprint, Windows 10 Home in S Mode, Slate Gray, F512JA-AS34"
          price={485.99}
          rating={4}
          image="https://images-na.ssl-images-amazon.com/images/I/81fstJkUlaL._AC_SL1500_.jpg"
        />
        <Product
          id={12349}
          title="Apple MacBook Air (13-inch, 8GB RAM, 256GB SSD Storage) - Space Gray (Latest Model)"
          price={949.99}
          rating={5}
          image="https://images-na.ssl-images-amazon.com/images/I/71k3fJh5EwL._AC_SL1500_.jpg"
        />
        <Product
          id={12350}
          title="Lenovo Flex 14 2-in-1 Convertible Laptop, 14 Inch FHD Touchscreen Display, AMD Ryzen 5 3500U Processor, 12GB DDR4 RAM, 256GB NVMe SSD, Windows 10, 81SS000DUS, Black, Pen Included"
          price={559.99}
          rating={4}
          image="https://images-na.ssl-images-amazon.com/images/I/81OzyRLdsEL._AC_SL1500_.jpg"
        />
        <Product
          id={12351}
          title="ASUS TUF Gaming A15 Gaming Laptop, 15.6” 144Hz FHD IPS-Type, AMD Ryzen 5 4600H, GeForce GTX 1650, 8GB DDR4, 512GB PCIe SSD, Gigabit Wi-Fi 5, Windows 10 Home, FA506IH-AS53"
          price={849.98}
          rating={5}
          image="https://images-na.ssl-images-amazon.com/images/I/A1A2yQlAXCL._AC_SL1500_.jpg"
        />
        <Product
          id={12352}
          title='Acer Chromebook Spin 311 Convertible Laptop, Intel Celeron N4020, 11.6" HD Touch, 4GB LPDDR4, 32GB eMMC, Gigabit Wi-Fi 5, Bluetooth 5.0, Google Chrome, CP311-2H-C679'
          price={366.83}
          rating={4}
          image="https://images-na.ssl-images-amazon.com/images/I/71c5W9NxN5L._AC_SL1500_.jpg"
        />
      </div>
    </div>
  );
}

export default Home;
