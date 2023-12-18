import Link from "next/link";
import Image from "next/image";
import "./Brand.css";
import AlfaD from "../../../../public/images/brands/AlfaDefault.png";
import AlfaO from "../../../../public/images/brands/AlfaOrange.png";
import ArtemisD from "../../../../public/images/brands/ArtemisDefault.png";
import ArtemisO from "../../../../public/images/brands/ArtemisOrange.png";
import IsD from "../../../../public/images/brands/IsDefault.png";
import IsO from "../../../../public/images/brands/IsOrange.png";
import IskeleD from "../../../../public/images/brands/IskeleDefault.png";
import IskeleO from "../../../../public/images/brands/IskeleOrange.png";
import YapiD from "../../../../public/images/brands/YapiDefault.png";
import YapiO from "../../../../public/images/brands/YapiOrange.png";
import { useState } from "react";
const Brand = () => {


  return (
    <section className="brand">
      <div className="konteyner">
        <div className="row">
          <div className="col-lg-12">
            <div className="bg">
              <ul className="flex justify-between items-center">
                <li>
                  <Link href="#" className="group">
                    <Image className="group-hover:hidden" src={AlfaD} alt="Alfa yayınları"></Image>
                    <Image className="hidden group-hover:block" src={AlfaO} alt="Alfa yayınları"></Image>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="group">
                    <Image className="group-hover:hidden" src={ArtemisD} alt="Alfa yayınları"></Image>
                    <Image className="hidden group-hover:block" src={ArtemisO} alt="Alfa yayınları"></Image>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="group">
                    <Image className="group-hover:hidden" src={IsD} alt="Alfa yayınları"></Image>
                    <Image className="hidden group-hover:block" src={IsO} alt="Alfa yayınları"></Image>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="group">
                    <Image className="group-hover:hidden" src={IskeleD} alt="Alfa yayınları"></Image>
                    <Image className="hidden group-hover:block" src={IskeleO} alt="Alfa yayınları"></Image>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="group">
                    <Image className="group-hover:hidden" src={YapiD} alt="Alfa yayınları"></Image>
                    <Image className="hidden group-hover:block" src={YapiO} alt="Alfa yayınları"></Image>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brand;
