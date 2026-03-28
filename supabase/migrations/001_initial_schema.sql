-- Companies table
CREATE TABLE IF NOT EXISTS companies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  logo_url TEXT,
  founded_year INTEGER,
  bbb_rating TEXT,
  bca_rating TEXT,
  star_rating DECIMAL(2,1),
  minimum_investment INTEGER,
  annual_fees TEXT,
  metals_offered TEXT[],
  custodians TEXT,
  storage_facilities TEXT,
  buyback_policy TEXT,
  key_selling_point TEXT,
  best_for TEXT,
  pros TEXT[],
  cons TEXT[],
  full_description TEXT,
  website_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE
);

-- Leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  state TEXT NOT NULL,
  investment_interest TEXT[],
  investment_timeline TEXT,
  investment_amount TEXT,
  current_accounts TEXT[],
  consent_given BOOLEAN NOT NULL DEFAULT FALSE,
  consent_text TEXT NOT NULL,
  consent_timestamp TIMESTAMP WITH TIME ZONE,
  ip_address TEXT,
  user_agent TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  referring_page TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'sold', 'dead')),
  notes TEXT
);

-- RLS Policies
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Companies: public read for active, authenticated write
CREATE POLICY "Companies are publicly readable" ON companies
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Authenticated users can manage companies" ON companies
  FOR ALL USING (auth.role() = 'authenticated');

-- Leads: only authenticated can read, anyone can insert with consent
CREATE POLICY "Anyone can insert leads" ON leads
  FOR INSERT WITH CHECK (consent_given = TRUE);

CREATE POLICY "Authenticated users can read leads" ON leads
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update leads" ON leads
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Updated at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_companies_updated_at
  BEFORE UPDATE ON companies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Seed companies
INSERT INTO companies (
  name, slug, founded_year, bbb_rating, bca_rating, star_rating,
  minimum_investment, annual_fees, metals_offered, custodians,
  storage_facilities, buyback_policy, key_selling_point, best_for,
  pros, cons, full_description, website_url, is_active, display_order, featured
) VALUES
(
  'Augusta Precious Metals',
  'augusta-precious-metals',
  2012, 'A+', NULL, 4.8, 50000,
  '$275 first year (includes setup), then varies',
  ARRAY['Gold', 'Silver'],
  'Equity Trust Company',
  'Delaware Depository',
  'Yes, 5% spread (transparent, published in transaction agreement)',
  'Education-first approach with one-on-one web conference with Harvard-trained economist',
  'First-time investors who value education and transparency',
  ARRAY['Education-first approach with dedicated web conference', 'Harvard-trained economist on staff', 'Exceptional A+ BBB rating and 5-star reviews', 'Transparent buyback spread (5% published)'],
  ARRAY['High minimum investment ($50,000)', 'Limited to gold and silver only'],
  'Augusta Precious Metals has established itself as one of the most trusted names in the gold IRA industry since its founding in 2012. The company''s education-first approach sets it apart from competitors, offering prospective clients a one-on-one web conference with a Harvard-trained economist before any investment decisions are made.

With an A+ rating from the Better Business Bureau and thousands of five-star reviews, Augusta has built a reputation for transparency and customer service excellence. Their buyback program offers a clearly published 5% spread, giving investors confidence in the liquidity of their precious metals holdings. While the $50,000 minimum investment may exclude some investors, those who qualify consistently report high satisfaction with the personalized service and educational resources provided.',
  'https://www.augustapreciousmetals.com',
  TRUE, 1, TRUE
),
(
  'American Hartford Gold',
  'american-hartford-gold',
  2015, 'A+', NULL, 4.8, 10000,
  '$225/year combined (custody + storage), waived for accounts over $100k (up to 3 years)',
  ARRAY['Gold', 'Silver', 'Platinum', 'Palladium'],
  'Equity Trust / STRATA Trust',
  'Delaware Depository, Brink''s',
  'Yes, no liquidation fees',
  'Low minimum, simple fee structure, Inc. 5000 fastest-growing company 5 consecutive years',
  'Beginners and mid-range investors',
  ARRAY['Low $10,000 minimum investment', 'Simple, transparent $225/year fee structure', 'Fees waived for accounts over $100k', 'Offers 4 metals including platinum and palladium', 'Inc. 5000 fastest-growing company recognition'],
  ARRAY['Relatively newer company (founded 2015)', 'Limited physical locations'],
  'American Hartford Gold has quickly risen to become one of the most popular gold IRA companies since its founding in 2015, earning recognition as an Inc. 5000 fastest-growing company for five consecutive years. Their accessible $10,000 minimum investment makes gold IRA investing available to a broader audience than many competitors.

The company''s straightforward $225/year combined fee for custody and storage eliminates the confusion often associated with gold IRA pricing. For larger accounts exceeding $100,000, American Hartford Gold waives these fees for up to three years, making it particularly attractive for substantial investments. Their offering of four precious metals (gold, silver, platinum, and palladium) gives investors more diversification options than many competitors.',
  'https://www.americanhartfordgold.com',
  TRUE, 2, TRUE
),
(
  'Goldco',
  'goldco',
  2006, 'A+', 'AAA', 4.7, 25000,
  '~$230/year (varies by custodian)',
  ARRAY['Gold', 'Silver'],
  'Various approved custodians',
  'Delaware Depository, Brink''s, IDS',
  'Yes, competitive rates',
  'Exceptional customer service reputation, high review volume',
  'Investors wanting a well-established, highly reviewed company',
  ARRAY['Nearly 20 years in business', 'AAA rating from Business Consumer Alliance', 'Thousands of verified 5-star reviews', 'Strong customer service reputation'],
  ARRAY['$25,000 minimum investment', 'Limited to gold and silver', 'Fees vary by custodian'],
  'Goldco has been serving precious metals investors since 2006, making it one of the most experienced companies in the gold IRA industry. The company has accumulated thousands of verified five-star reviews across multiple platforms, demonstrating consistent customer satisfaction over nearly two decades of operation.

With both an A+ BBB rating and a AAA rating from the Business Consumer Alliance, Goldco''s reputation for customer service is industry-leading. Their IRA rollover specialists guide clients through every step of the process, from initial consultation to account funding. While their $25,000 minimum and limitation to gold and silver may not suit all investors, those seeking a proven, reliable partner for long-term precious metals investing consistently choose Goldco.',
  'https://www.goldco.com',
  TRUE, 3, TRUE
),
(
  'Birch Gold Group',
  'birch-gold-group',
  2003, 'A+', 'AAA', 4.7, 10000,
  'Flat-rate (transparent, published on website)',
  ARRAY['Gold', 'Silver', 'Platinum', 'Palladium'],
  'Equity Trust / STRATA Trust',
  'Delaware Depository, Brink''s',
  'Yes',
  'Most transparent fee structure, 20+ years in business, flat-rate fees benefit large accounts',
  'High-balance investors, those who value fee transparency',
  ARRAY['Over 20 years in business (founded 2003)', 'Flat-rate fee structure benefits large accounts', 'AAA BCA rating plus A+ BBB', 'All four precious metals available', 'Highly transparent pricing'],
  ARRAY['Flat fees can be higher percentage for small accounts', 'Website less user-friendly than competitors'],
  'Birch Gold Group has been helping Americans protect their wealth with precious metals since 2003, establishing over two decades of experience and trust in the industry. The company''s commitment to fee transparency is exceptional — their flat-rate fee structure is clearly published on their website, with no hidden charges or surprise costs.

For investors with larger portfolios, Birch Gold''s flat-rate fees become increasingly cost-effective compared to percentage-based alternatives. The company offers all four major precious metals (gold, silver, platinum, and palladium) through trusted custodians, and their partnerships with both Equity Trust and STRATA Trust provide flexibility in account management. With dual A+ BBB and AAA BCA ratings, Birch Gold Group demonstrates consistent adherence to ethical business practices.',
  'https://www.birchgold.com',
  TRUE, 4, FALSE
),
(
  'Noble Gold Investments',
  'noble-gold-investments',
  2016, 'A+', NULL, 4.7, 20000,
  '$230/year (custody + storage)',
  ARRAY['Gold', 'Silver', 'Platinum', 'Palladium'],
  'Equity Trust Company',
  'Proprietary Texas depository, Delaware Depository',
  'Yes',
  'Royal Survival Packs (physical gold/silver bundles for direct delivery), own depository',
  'Preparedness-minded investors who may want physical possession option',
  ARRAY['Owns its own IRS-approved Texas depository', 'Royal Survival Packs for physical delivery', 'All four precious metals available', 'A+ BBB rating'],
  ARRAY['Higher minimum than some competitors ($20,000)', 'Newer company (founded 2016)', 'Buyback terms less competitive'],
  'Noble Gold Investments distinguishes itself from the competition with two unique offerings: proprietary Royal Survival Packs and Texas-based storage. The Royal Survival Packs are curated bundles of physical gold and silver that can be delivered directly to investors, appealing to those who want tangible metal in their possession alongside their IRA holdings.

Noble Gold''s Texas-based depository is the first IRS-approved company-owned precious metals storage facility in the country, giving investors confidence that their metals are stored in a secure, dedicated facility. Founded in 2016, Noble Gold has grown rapidly while maintaining an A+ BBB rating. Their $20,000 minimum investment falls in the middle of the pack, making them accessible to a broad range of investors while providing premium services.',
  'https://www.noblegoldinvestments.com',
  TRUE, 5, FALSE
),
(
  'Lear Capital',
  'lear-capital',
  1997, 'A+', NULL, 4.7, 10000,
  '$50 application fee (waived over $10k), storage fees vary',
  ARRAY['Gold', 'Silver'],
  'Various',
  'Delaware Depository',
  'Yes, pays market rate with no fees/commissions',
  'Longest operating company on the list (27+ years), strong reviews, no buyback fees',
  'Investors who prefer longevity and track record',
  ARRAY['Longest track record (founded 1997)', 'No fees or commissions on buyback', 'Pays market rate on buyback', 'Application fee waived for qualifying accounts', 'Strong multi-platform review ratings'],
  ARRAY['Limited to gold and silver only', 'Storage fees vary and can be unclear upfront'],
  'Lear Capital holds the distinction of being the oldest company on this list, having served precious metals investors since 1997. With over 27 years in business, Lear Capital has navigated multiple economic cycles, market crashes, and regulatory changes, providing investors with confidence in their operational resilience and experience.

The company''s buyback program is one of the most investor-friendly in the industry, paying market rates with absolutely no fees or commissions. This transparency in the exit process gives investors confidence from day one. Lear Capital maintains strong ratings across Google, Trustpilot, and the BBB, reflecting consistent customer satisfaction built over nearly three decades of service. Their $10,000 minimum makes them accessible to a wide range of investors.',
  'https://www.learcapital.com',
  TRUE, 6, FALSE
),
(
  'Advantage Gold',
  'advantage-gold',
  2014, 'A+', NULL, 4.9, 10000,
  'Varies by custodian',
  ARRAY['Gold', 'Silver', 'Platinum', 'Palladium'],
  'STRATA Trust / Equity Trust',
  'Brink''s, Delaware Depository',
  'Yes',
  'Exceptional Trustpilot reviews (1,780+ reviews, 98% five-star)',
  'Investors who rely heavily on peer reviews',
  ARRAY['Highest star rating on our list (4.9/5)', '98% five-star reviews on Trustpilot', 'Low $10,000 minimum', 'All four precious metals available', 'A+ BBB rating'],
  ARRAY['Fees vary by custodian (less predictable)', 'Less name recognition than older competitors'],
  'Advantage Gold has earned the highest customer satisfaction rating on our list, with an extraordinary 98% five-star rating across over 1,780 Trustpilot reviews. This remarkable achievement reflects the company''s relentless focus on customer experience since its founding in 2014. Their team of IRA specialists provides personalized guidance through every step of the investment process.

With a low $10,000 minimum investment and offerings across all four precious metals, Advantage Gold combines accessibility with comprehensive options. The company partners with both STRATA Trust and Equity Trust for IRA custody, and utilizes Brink''s and Delaware Depository for secure storage. For investors who place significant weight on peer reviews and customer satisfaction metrics, Advantage Gold''s track record is unmatched in the industry.',
  'https://www.advantagegold.com',
  TRUE, 7, FALSE
),
(
  'Patriot Gold Group',
  'patriot-gold-group',
  2016, 'A+', NULL, 4.6, 25000,
  '$180/year all-in (lowest combined fee), waived for $100k+ accounts',
  ARRAY['Gold', 'Silver'],
  'Various',
  'Segregated storage (default, no extra charge)',
  'Terms not fully disclosed',
  'Lowest annual fee, segregated storage included by default',
  'Cost-conscious investors focused on minimizing ongoing fees',
  ARRAY['Lowest annual fee on our list ($180/year)', 'Segregated storage included at no extra charge', 'Fees waived for accounts over $100k', 'A+ BBB rating'],
  ARRAY['Limited to gold and silver only', 'Higher minimum ($25,000)', 'Buyback terms not fully transparent', 'Newer company (founded 2016)'],
  'Patriot Gold Group has carved out a niche as the most cost-effective option for gold IRA investors focused on minimizing ongoing fees. At just $180/year for all-in fees — the lowest on our list — Patriot Gold Group makes long-term precious metals investing more affordable for cost-conscious investors.

One particularly notable feature is Patriot Gold Group''s inclusion of segregated storage as the default option at no additional charge. Segregated storage, where your metals are stored separately from other investors'' holdings, is typically offered as a premium upgrade by competitors. For accounts exceeding $100,000, Patriot Gold Group waives all annual fees, making them especially attractive for larger investors. While their $25,000 minimum and limitation to gold and silver narrow their appeal, investors who qualify find excellent value in their straightforward fee structure.',
  'https://www.patriotgoldgroup.com',
  TRUE, 8, FALSE
);
