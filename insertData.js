const mongoose = require("mongoose");
const Product = require("./modals/product");
const data = [
  {
    name: 'T-Shirt',
    description: 'A comfortable cotton t-shirt.',
    s: 20,
    m: 25,
    l: 30,
    price: 15,
    img: [
      'https://stylesatlife.com/wp-content/uploads/2018/03/Heavy-cotton-t-shirts.jpg'
    ],
    genre: [],
  },
  {
    name: 'Hoodie',
    description: 'A warm hoodie for cold days.',
    s: 25,
    m: 30,
    l: 35,
    price: 25,
    img: [
      'https://www.jiomart.com/images/product/original/rvx6nexitc/faltu-co-women-s-zipper-cotton-hooded-hoodies-jacket-with-zip-amp-pocket-stay-warm-and-stylish-with-winter-hoodies-for-women-trendy-designs-comfortable-fit-and-quality-materials-perfect-for-cold-weather-fashion-product-images-rvx6nexitc-5-202311071058.jpg?im=Resize=(500,630)'
    ],
  },
  {
    name: 'Sneakers',
    description: 'Comfortable sports shoes for everyday wear.',
    s: 40,
    m: 42,
    l: 44,
    price: 600,
    img: [
      'https://assets.ajio.com/medias/sys_master/root/20230823/tdNr/64e62a63afa4cf41f57257a3/-473Wx593H-469495049-grey-MODEL.jpg'
    ],
    genre: [],
    review: []
  },
  {
    name: 'Dress Shirt',
    description: 'Formal dress shirt for professional occasions.',
    s: 15,
    m: 20,
    l: 25,
    price: 30,
    img: [
      'https://lp2.hm.com/hmgoepprod?set=source[/b5/bf/b5bf71dda744e604ee1487636093a26e9b1d79ce.jpg],origin[dam],category[],type[LOOKBOOK],res[z],hmver[1]&call=url[file:/product/main]'
    ],
  },
  {
    name: 'Shorts',
    description: 'Casual shorts for a relaxed look.',
    s: 20,
    m: 22,
    l: 24,
    price: 1899,
    img: [
      'https://contents.mediadecathlon.com/p2197356/20ec45d54c1ff25c1d2a554ad65cd203/p2197356.jpg'
    ],
  },
  {
    name: 'Sweater',
    description: 'Warm knitted sweater for chilly days.',
    s: 25,
    m: 28,
    l: 30,
    price: 350,
    img: [
      'https://assets.ajio.com/medias/sys_master/root/20231016/TCtQ/652d53cdafa4cf41f548d073/-473Wx593H-443014853-offwhite-MODEL.jpg'
    ],
  },
  {
    name: 'KALINI',
    description: 'Ethnic Motifs Yoke Design Gotta Patti Kurta With Trousers & Dupatta',
    s: 12,
    m: 23,
    l: 23,
    price: 999,
    img: [
      'https://res.cloudinary.com/dbaw4xx1j/image/upload/v1710930742/ketch_dev/ocelfrcqx6ikfbtwzmyc.jpg',
      'https://res.cloudinary.com/dbaw4xx1j/image/upload/v1710930741/ketch_dev/yjwumueqkqvfvl13oxyo.webp',
      'https://res.cloudinary.com/dbaw4xx1j/image/upload/v1710930742/ketch_dev/rfa7o3jjeocdl4hdigrr.png'
    ],
  },
  {
    name: 'INVICTUS',
    description: 'Floral Printed Club Slim Fit Cotton Twill Casual Shirt',
    s: 0,
    m: 12,
    l: 10,
    price: 999,
    img: [
      'https://res.cloudinary.com/dbaw4xx1j/image/upload/v1710961358/ketch_dev/l0pqnlhix1gqugstp1kc.webp',
      'https://res.cloudinary.com/dbaw4xx1j/image/upload/v1710961359/ketch_dev/yudpjouuvw1jh0so9fuy.webp',
      'https://res.cloudinary.com/dbaw4xx1j/image/upload/v1710961359/ketch_dev/mpjuj1zf1o83xz1nnxju.png'
    ],
  },
  {
    name: 'Silk Land',
    description: 'Kalamkari Zari Art Silk Chanderi Saree',
    s: 24,
    m: 20,
    l: 12,
    price: 1200,
    img: [
      'https://res.cloudinary.com/dbaw4xx1j/image/upload/v1711010663/ketch_dev/gbyjhur7lewozoxkgo6i.webp',
      'https://res.cloudinary.com/dbaw4xx1j/image/upload/v1711010663/ketch_dev/m2eik3lnujpwupzs2hy3.jpg',
      'https://res.cloudinary.com/dbaw4xx1j/image/upload/v1711010663/ketch_dev/gishev7wuu9qqnxfhoq8.png'
    ],
  },
  {
    name: 'Nautica',
    description: 'Men Slim Fit Tartan Checks Pure Cotton Casual Shirt',
    s: 0,
    m: 0,
    l: 18,
    price: 999,
    img: [
      'https://res.cloudinary.com/dbaw4xx1j/image/upload/v1711011094/ketch_dev/ykz12sxmmq5yaulhgg3n.jpg',
      'https://res.cloudinary.com/dbaw4xx1j/image/upload/v1711011094/ketch_dev/jx0matb8d3nkbkcwwaxs.jpg',
      'https://res.cloudinary.com/dbaw4xx1j/image/upload/v1711011095/ketch_dev/sjrl7f4i6lm4liboljai.png'
    ],
    genre: [],
  }
]

  

async function main(){
    await mongoose.connect("mongodb+srv://ayushkhandal6126:5tk2KSo3GnWUIQMY@cluster0.u9x97v6.mongodb.net/ketch?retryWrites=true&w=majority");
}

main()
.then(()=>{
    console.log("Connected to database successfully");
})
.catch((err)=>{
    console.log(err.message);
});


async function insertData(){
    await Product.deleteMany({});
    await Product.insertMany(data);
}

insertData();