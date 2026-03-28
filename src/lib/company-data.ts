import type { Company } from '@/types'

export const COMPANY_SEED_DATA: Omit<Company, 'id' | 'created_at' | 'updated_at'>[] = [
  {
    name: 'GoldenCrest Metals',
    slug: 'goldencrest-metals',
    logo_url: null,
    founded_year: 2010,
    bbb_rating: 'A+',
    bca_rating: 'AAA',
    star_rating: 5.0,
    minimum_investment: 10000,
    annual_fees: '$195/year all-in (custody + storage), waived for accounts over $100k',
    metals_offered: ['Gold', 'Silver', 'Platinum', 'Palladium'],
    custodians: 'Equity Trust Company',
    storage_facilities: 'Delaware Depository, Brink\'s Global Services',
    buyback_policy: 'Yes, guaranteed market rate with zero liquidation fees',
    key_selling_point: 'Personalized specialist support, lowest all-in fees, and a guaranteed buyback program with no hidden costs',
    best_for: 'Investors who want dedicated one-on-one support and transparent, low-cost fee structures',
    pros: [
      'Dedicated account specialist from day one',
      'Among the lowest all-in annual fees ($195/year)',
      'Guaranteed buyback at market rate, no fees',
      'All four precious metals available',
      'A+ BBB and AAA BCA ratings',
    ],
    cons: [
      'Not available in all states',
    ],
    full_description: `GoldenCrest Metals has built its reputation on one core principle: every investor deserves a dedicated specialist who guides them through the entire process — from initial rollover to ongoing account management. Unlike companies that hand clients off to a call center, GoldenCrest assigns a single point of contact to each account, ensuring continuity and personalized attention at every step.

With an A+ BBB rating, a AAA rating from the Business Consumer Alliance, and an all-in annual fee of just $195 (waived entirely for accounts over $100,000), GoldenCrest Metals combines premium service with industry-leading cost efficiency. Their guaranteed buyback program pays full market rate with zero liquidation fees, giving investors confidence that their gold IRA is as liquid as it is secure. GoldenCrest supports all four IRS-approved precious metals — gold, silver, platinum, and palladium — stored at IRS-approved depositories with full insurance coverage.`,
    website_url: 'https://www.goldencrestmetals.com',
    is_active: true,
    display_order: 1,
    featured: true,
  },
  {
    name: 'Augusta Precious Metals',
    slug: 'augusta-precious-metals',
    logo_url: null,
    founded_year: 2012,
    bbb_rating: 'A+',
    bca_rating: null,
    star_rating: 4.8,
    minimum_investment: 50000,
    annual_fees: '$275 first year (includes setup), then varies',
    metals_offered: ['Gold', 'Silver'],
    custodians: 'Equity Trust Company',
    storage_facilities: 'Delaware Depository',
    buyback_policy: 'Yes, 5% spread (transparent, published in transaction agreement)',
    key_selling_point: 'Education-first approach with one-on-one web conference with Harvard-trained economist',
    best_for: 'First-time investors who value education and transparency',
    pros: [
      'Education-first approach with dedicated web conference',
      'Harvard-trained economist on staff',
      'Exceptional A+ BBB rating and 5-star reviews',
      'Transparent buyback spread (5% published)',
    ],
    cons: [
      'High minimum investment ($50,000)',
      'Limited to gold and silver only',
    ],
    full_description: `Augusta Precious Metals has established itself as one of the most trusted names in the gold IRA industry since its founding in 2012. The company's education-first approach sets it apart from competitors, offering prospective clients a one-on-one web conference with a Harvard-trained economist before any investment decisions are made.

With an A+ rating from the Better Business Bureau and thousands of five-star reviews, Augusta has built a reputation for transparency and customer service excellence. Their buyback program offers a clearly published 5% spread, giving investors confidence in the liquidity of their precious metals holdings. While the $50,000 minimum investment may exclude some investors, those who qualify consistently report high satisfaction with the personalized service and educational resources provided.`,
    website_url: 'https://www.augustapreciousmetals.com',
    is_active: true,
    display_order: 2,
    featured: true,
  },
  {
    name: 'American Hartford Gold',
    slug: 'american-hartford-gold',
    logo_url: null,
    founded_year: 2015,
    bbb_rating: 'A+',
    bca_rating: null,
    star_rating: 4.8,
    minimum_investment: 10000,
    annual_fees: '$225/year combined (custody + storage), waived for accounts over $100k (up to 3 years)',
    metals_offered: ['Gold', 'Silver', 'Platinum', 'Palladium'],
    custodians: 'Equity Trust / STRATA Trust',
    storage_facilities: "Delaware Depository, Brink's",
    buyback_policy: 'Yes, no liquidation fees',
    key_selling_point: 'Low minimum, simple fee structure, Inc. 5000 fastest-growing company 5 consecutive years',
    best_for: 'Beginners and mid-range investors',
    pros: [
      'Low $10,000 minimum investment',
      'Simple, transparent $225/year fee structure',
      'Fees waived for accounts over $100k',
      'Offers 4 metals including platinum and palladium',
      'Inc. 5000 fastest-growing company recognition',
    ],
    cons: [
      'Relatively newer company (founded 2015)',
      'Limited physical locations',
    ],
    full_description: `American Hartford Gold has quickly risen to become one of the most popular gold IRA companies since its founding in 2015, earning recognition as an Inc. 5000 fastest-growing company for five consecutive years. Their accessible $10,000 minimum investment makes gold IRA investing available to a broader audience than many competitors.

The company's straightforward $225/year combined fee for custody and storage eliminates the confusion often associated with gold IRA pricing. For larger accounts exceeding $100,000, American Hartford Gold waives these fees for up to three years, making it particularly attractive for substantial investments. Their offering of four precious metals (gold, silver, platinum, and palladium) gives investors more diversification options than many competitors.`,
    website_url: 'https://www.americanhartfordgold.com',
    is_active: true,
    display_order: 3,
    featured: true,
  },
  {
    name: 'Birch Gold Group',
    slug: 'birch-gold-group',
    logo_url: null,
    founded_year: 2003,
    bbb_rating: 'A+',
    bca_rating: 'AAA',
    star_rating: 4.7,
    minimum_investment: 10000,
    annual_fees: 'Flat-rate (transparent, published on website)',
    metals_offered: ['Gold', 'Silver', 'Platinum', 'Palladium'],
    custodians: 'Equity Trust / STRATA Trust',
    storage_facilities: "Delaware Depository, Brink's",
    buyback_policy: 'Yes',
    key_selling_point: 'Most transparent fee structure, 20+ years in business, flat-rate fees benefit large accounts',
    best_for: 'High-balance investors, those who value fee transparency',
    pros: [
      'Over 20 years in business (founded 2003)',
      'Flat-rate fee structure benefits large accounts',
      'AAA BCA rating plus A+ BBB',
      'All four precious metals available',
      'Highly transparent pricing',
    ],
    cons: [
      'Flat fees can be higher percentage for small accounts',
      'Website less user-friendly than competitors',
    ],
    full_description: `Birch Gold Group has been helping Americans protect their wealth with precious metals since 2003, establishing over two decades of experience and trust in the industry. The company's commitment to fee transparency is exceptional — their flat-rate fee structure is clearly published on their website, with no hidden charges or surprise costs.

For investors with larger portfolios, Birch Gold's flat-rate fees become increasingly cost-effective compared to percentage-based alternatives. The company offers all four major precious metals (gold, silver, platinum, and palladium) through trusted custodians, and their partnerships with both Equity Trust and STRATA Trust provide flexibility in account management. With dual A+ BBB and AAA BCA ratings, Birch Gold Group demonstrates consistent adherence to ethical business practices.`,
    website_url: 'https://www.birchgold.com',
    is_active: true,
    display_order: 4,
    featured: false,
  },
  {
    name: 'Noble Gold Investments',
    slug: 'noble-gold-investments',
    logo_url: null,
    founded_year: 2016,
    bbb_rating: 'A+',
    bca_rating: null,
    star_rating: 4.7,
    minimum_investment: 20000,
    annual_fees: '$230/year (custody + storage)',
    metals_offered: ['Gold', 'Silver', 'Platinum', 'Palladium'],
    custodians: 'Equity Trust Company',
    storage_facilities: 'Proprietary Texas depository, Delaware Depository',
    buyback_policy: 'Yes',
    key_selling_point: 'Royal Survival Packs (physical gold/silver bundles for direct delivery), own depository',
    best_for: 'Preparedness-minded investors who may want physical possession option',
    pros: [
      'Owns its own IRS-approved Texas depository',
      'Royal Survival Packs for physical delivery',
      'All four precious metals available',
      'A+ BBB rating',
    ],
    cons: [
      'Higher minimum than some competitors ($20,000)',
      'Newer company (founded 2016)',
      'Buyback terms less competitive',
    ],
    full_description: `Noble Gold Investments distinguishes itself from the competition with two unique offerings: proprietary Royal Survival Packs and Texas-based storage. The Royal Survival Packs are curated bundles of physical gold and silver that can be delivered directly to investors, appealing to those who want tangible metal in their possession alongside their IRA holdings.

Noble Gold's Texas-based depository is the first IRS-approved company-owned precious metals storage facility in the country, giving investors confidence that their metals are stored in a secure, dedicated facility. Founded in 2016, Noble Gold has grown rapidly while maintaining an A+ BBB rating. Their $20,000 minimum investment falls in the middle of the pack, making them accessible to a broad range of investors while providing premium services.`,
    website_url: 'https://www.noblegoldinvestments.com',
    is_active: true,
    display_order: 5,
    featured: false,
  },
  {
    name: 'Lear Capital',
    slug: 'lear-capital',
    logo_url: null,
    founded_year: 1997,
    bbb_rating: 'A+',
    bca_rating: null,
    star_rating: 4.7,
    minimum_investment: 10000,
    annual_fees: '$50 application fee (waived over $10k), storage fees vary',
    metals_offered: ['Gold', 'Silver'],
    custodians: 'Various',
    storage_facilities: 'Delaware Depository',
    buyback_policy: 'Yes, pays market rate with no fees/commissions',
    key_selling_point: 'Longest operating company on the list (27+ years), strong reviews, no buyback fees',
    best_for: 'Investors who prefer longevity and track record',
    pros: [
      'Longest track record (founded 1997)',
      'No fees or commissions on buyback',
      'Pays market rate on buyback',
      'Application fee waived for qualifying accounts',
      'Strong multi-platform review ratings',
    ],
    cons: [
      'Limited to gold and silver only',
      'Storage fees vary and can be unclear upfront',
    ],
    full_description: `Lear Capital holds the distinction of being the oldest company on this list, having served precious metals investors since 1997. With over 27 years in business, Lear Capital has navigated multiple economic cycles, market crashes, and regulatory changes, providing investors with confidence in their operational resilience and experience.

The company's buyback program is one of the most investor-friendly in the industry, paying market rates with absolutely no fees or commissions. This transparency in the exit process gives investors confidence from day one. Lear Capital maintains strong ratings across Google, Trustpilot, and the BBB, reflecting consistent customer satisfaction built over nearly three decades of service. Their $10,000 minimum makes them accessible to a wide range of investors.`,
    website_url: 'https://www.learcapital.com',
    is_active: true,
    display_order: 6,
    featured: false,
  },
  {
    name: 'Advantage Gold',
    slug: 'advantage-gold',
    logo_url: null,
    founded_year: 2014,
    bbb_rating: 'A+',
    bca_rating: null,
    star_rating: 4.9,
    minimum_investment: 10000,
    annual_fees: 'Varies by custodian',
    metals_offered: ['Gold', 'Silver', 'Platinum', 'Palladium'],
    custodians: 'STRATA Trust / Equity Trust',
    storage_facilities: "Brink's, Delaware Depository",
    buyback_policy: 'Yes',
    key_selling_point: 'Exceptional Trustpilot reviews (1,780+ reviews, 98% five-star)',
    best_for: 'Investors who rely heavily on peer reviews',
    pros: [
      'Highest star rating on our list (4.9/5)',
      '98% five-star reviews on Trustpilot',
      'Low $10,000 minimum',
      'All four precious metals available',
      'A+ BBB rating',
    ],
    cons: [
      'Fees vary by custodian (less predictable)',
      'Less name recognition than older competitors',
    ],
    full_description: `Advantage Gold has earned the highest customer satisfaction rating on our list, with an extraordinary 98% five-star rating across over 1,780 Trustpilot reviews. This remarkable achievement reflects the company's relentless focus on customer experience since its founding in 2014. Their team of IRA specialists provides personalized guidance through every step of the investment process.

With a low $10,000 minimum investment and offerings across all four precious metals, Advantage Gold combines accessibility with comprehensive options. The company partners with both STRATA Trust and Equity Trust for IRA custody, and utilizes Brink's and Delaware Depository for secure storage. For investors who place significant weight on peer reviews and customer satisfaction metrics, Advantage Gold's track record is unmatched in the industry.`,
    website_url: 'https://www.advantagegold.com',
    is_active: true,
    display_order: 7,
    featured: false,
  },
  {
    name: 'Patriot Gold Group',
    slug: 'patriot-gold-group',
    logo_url: null,
    founded_year: 2016,
    bbb_rating: 'A+',
    bca_rating: null,
    star_rating: 4.6,
    minimum_investment: 25000,
    annual_fees: '$180/year all-in (lowest combined fee), waived for $100k+ accounts',
    metals_offered: ['Gold', 'Silver'],
    custodians: 'Various',
    storage_facilities: 'Segregated storage (default, no extra charge)',
    buyback_policy: 'Terms not fully disclosed',
    key_selling_point: 'Lowest annual fee, segregated storage included by default',
    best_for: 'Cost-conscious investors focused on minimizing ongoing fees',
    pros: [
      'Lowest annual fee on our list ($180/year)',
      'Segregated storage included at no extra charge',
      'Fees waived for accounts over $100k',
      'A+ BBB rating',
    ],
    cons: [
      'Limited to gold and silver only',
      'Higher minimum ($25,000)',
      'Buyback terms not fully transparent',
      'Newer company (founded 2016)',
    ],
    full_description: `Patriot Gold Group has carved out a niche as the most cost-effective option for gold IRA investors focused on minimizing ongoing fees. At just $180/year for all-in fees — the lowest on our list — Patriot Gold Group makes long-term precious metals investing more affordable for cost-conscious investors.

One particularly notable feature is Patriot Gold Group's inclusion of segregated storage as the default option at no additional charge. Segregated storage, where your metals are stored separately from other investors' holdings, is typically offered as a premium upgrade by competitors. For accounts exceeding $100,000, Patriot Gold Group waives all annual fees, making them especially attractive for larger investors. While their $25,000 minimum and limitation to gold and silver narrow their appeal, investors who qualify find excellent value in their straightforward fee structure.`,
    website_url: 'https://www.patriotgoldgroup.com',
    is_active: true,
    display_order: 8,
    featured: false,
  },
]

export function getCompanyBySlug(slug: string) {
  return COMPANY_SEED_DATA.find((c) => c.slug === slug) ?? null
}

export function getFeaturedCompanies() {
  return COMPANY_SEED_DATA.filter((c) => c.featured && c.is_active).sort(
    (a, b) => a.display_order - b.display_order
  )
}

export function getAllCompanies() {
  return COMPANY_SEED_DATA.filter((c) => c.is_active).sort(
    (a, b) => a.display_order - b.display_order
  )
}
