import logo1 from '../../../public/assets/images/landing_p/brands/uideck.svg'
import logo1light from '../../../public/assets/images/landing_p/brands/uideck-light.svg'
import logo2 from '../../../public/assets/images/landing_p/brands/tailgrids.svg'
import logo2light from '../../../public/assets/images/landing_p/brands/tailgrids-light.svg'
import logo3 from '../../../public/assets/images/landing_p/brands/lineicons.svg'
import logo3light from '../../../public/assets/images/landing_p/brands/lineicons-light.svg'
import logo4 from '../../../public/assets/images/landing_p/brands/ayroui.svg'
import logo4light from '../../../public/assets/images/landing_p/brands/ayroui-light.svg'
import logo5 from '../../../public/assets/images/landing_p/brands/plainadmin.svg'
import logo5light from '../../../public/assets/images/landing_p/brands/plainadmin-light.svg'


type Brand = {
  id: number;
  name: string;
  href: string;
  image: string;
  imageLight?: string;
};

const brandsData: Brand[] = [
  {
    id: 1,
    name: "UIdeck",
    href: "https://uideck.com",
    image: logo1,
    imageLight: logo1light,
  },
  {
    id: 2,
    name: "Tailgrids",
    href: "https://tailgrids.com",
    image: logo2,
    imageLight: logo2light,
  },
  {
    id: 3,
    name: "Lineicons",
    href: "https://lineicons.com",
    image: logo3,
    imageLight: logo3light,
  },
  {
    id: 4,
    name: "Ayro UI",
    href: "https://ayroui.com",
    image: logo4,
    imageLight: logo4light,
  },
  {
    id: 5,
    name: "PlainAdmin",
    href: "https://plainadmin.com",
    image: logo5,
    imageLight: logo5light,
  },
];

export default brandsData;
