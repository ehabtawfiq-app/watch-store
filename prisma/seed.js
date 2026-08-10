const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // إنشاء قسم رولكس والفاخرة
  const luxury = await prisma.category.upsert({
    where: { slug: 'luxury' },
    update: {},
    create: { name: 'ساعات فاخرة', slug: 'luxury' },
  });

  const sport = await prisma.category.upsert({
    where: { slug: 'sport' },
    update: {},
    create: { name: 'رياضية الاحتراف', slug: 'sport' },
  });

  const classic = await prisma.category.upsert({
    where: { slug: 'classic' },
    update: {},
    create: { name: 'كلاسيك راقي', slug: 'classic' },
  });

  // قائمة متنوعة من ساعات رولكس الشهيرة
  const watches = [
    {
      title: 'رولكس دايتونا سيراميك أسود',
      slug: 'rolex-daytona-black-ceramic',
      description: 'ساعة رولكس كوزموغراف دايتونا ميناء أسود وكرونوغراف رياضي عالي الدقة.',
      price: 15200,
      images: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
      brand: 'Rolex',
      movement: 'أوتوماتيك 4130',
      caseDiameter: '40mm',
      waterResist: '100m',
      stock: 4,
      categoryId: luxury.id,
    },
    {
      title: 'رولكس صبمارينر ديت (Submariner)',
      slug: 'rolex-submariner-date',
      description: 'ساعة الغوص الأيقونية بقرص سيراميك أسود وزجاج مكبر للتاريخ.',
      price: 13800,
      images: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800',
      brand: 'Rolex',
      movement: 'أوتوماتيك 3235',
      caseDiameter: '41mm',
      waterResist: '300m',
      stock: 6,
      categoryId: sport.id,
    },
    {
      title: 'رولكس دايت جُست ذهب وأستيل (Datejust)',
      slug: 'rolex-datejust-two-tone',
      description: 'تصميم دايت جُست الكلاسيكي الخالد بمزيج من الذهب الأصفر والستانلس ستيل.',
      price: 12500,
      images: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800',
      brand: 'Rolex',
      movement: 'أوتوماتيك 3235',
      caseDiameter: '36mm',
      waterResist: '100m',
      stock: 8,
      categoryId: classic.id,
    },
    {
      title: 'رولكس جي إم تي ماستر II (Pepsi)',
      slug: 'rolex-gmt-master-ii-pepsi',
      description: 'ساعة الطيارين بشاشتين زمنيتين وإطار سيراميك باللونين الأحمر والأزرق.',
      price: 17900,
      images: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800',
      brand: 'Rolex',
      movement: 'أوتوماتيك 3285',
      caseDiameter: '40mm',
      waterResist: '100m',
      stock: 3,
      categoryId: sport.id,
    },
    {
      title: 'رولكس أويستر بربتشوال أزرق (Oyster Perpetual)',
      slug: 'rolex-oyster-perpetual-blue',
      description: 'بساطة وأناقة المطلقة بميناء أزرق ملكي متدرج وسوار أويستر مريح.',
      price: 8900,
      images: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800',
      brand: 'Rolex',
      movement: 'أوتوماتيك 3230',
      caseDiameter: '41mm',
      waterResist: '100m',
      stock: 5,
      categoryId: classic.id,
    },
    {
      title: 'رولكس دي ديت ذهب أصفر (Day-Date President)',
      slug: 'rolex-day-date-gold',
      description: 'ساعة الرؤساء والمشاهير المصنوعة بالكامل من الذهب الأصفر عيار 18.',
      price: 34500,
      images: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=800',
      brand: 'Rolex',
      movement: 'أوتوماتيك 3255',
      caseDiameter: '40mm',
      waterResist: '100m',
      stock: 2,
      categoryId: luxury.id,
    },
    {
      title: 'رولكس يخت ماستر سيراميك (Yacht-Master)',
      slug: 'rolex-yacht-master-42',
      description: 'تصميم مخصص لعشاق الإبحار والرياضات البحرية بقرص سيراميك مطفي.',
      price: 28200,
      images: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800',
      brand: 'Rolex',
      movement: 'أوتوماتيك 3235',
      caseDiameter: '42mm',
      waterResist: '100m',
      stock: 4,
      categoryId: sport.id,
    },
    {
      title: 'رولكس ميلغوس ميناء أخضر (Milgauss)',
      slug: 'rolex-milgauss-green-glass',
      description: 'ساعة مقاومة للمجالات المغناطيسية بزجاج زفير أخضر وعقرب ثواني برتقالي.',
      price: 11400,
      images: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800',
      brand: 'Rolex',
      movement: 'أوتوماتيك 3131',
      caseDiameter: '40mm',
      waterResist: '100m',
      stock: 3,
      categoryId: classic.id,
    }
  ];

  for (const watch of watches) {
    await prisma.watch.upsert({
      where: { slug: watch.slug },
      update: watch,
      create: watch,
    });
  }

  console.log('✅ تم إضافة مجموعة ساعات رولكس بنجاح!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });