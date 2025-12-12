import React, { useState, useMemo, useEffect, useRef } from 'react';
import * as d3 from 'd3';

// Company data - 67 companies
const companiesData = [
  {
    "name": "GRAIL Talent",
    "website": "https://grail-talent.com/",
    "type": "Mix (Talent Management Company & Platform)",
    "Unified Type": "Mix (Talent Management Company & Platform)",
    "business_model": "Commission-based model for talent representation. For brands, it offers a subscription-based platform (GrailX) with added commission fees.",
    "pricing": "For creators, there are no fees. For brands using the GrailX platform, the pricing is tiered: GrailX Standard is $350/month + 5% agency commission + 5% creator commission. GrailX Pro is $900/month + 3% agency commission + 5% creator commission. Both plans offer flat-fee talent booking.",
    "offer_usp": "Connects creators with over 65,000 brand collaborations and provides a flexible infrastructure for talent growth, unlocking career paths beyond social media.",
    "sales_points": "Secured over 65,000 brand collaborations for its 1000+ creators. Trusted by over 3,000 global brands including H&M, Hulu, Skims, and Amazon. Employs a global team of over 150 members. Offers the GrailX platform, giving brands access to a network of over 9,000 creators. Nominated for Top Creator Agency at the Creator Agency Awards in January 2025. Provides new creator dashboards for tracking campaigns, contracts, and payments.",
    "positioning": "Positions itself as 'The Home for Creators,' helping them maximize their potential, access opportunities, and make more money. For brands, it is a partner for finding the right creators to bring campaigns to life.",
    "client_profile": "Primarily serves content creators on Instagram, TikTok, and YouTube. Also targets brands of all sizes (including H&M, Supergoop, Glossier, Lego x Fortnite) seeking influencer collaborations, as well as talent managers seeking a commission-based work model.",
    "geographical_focus": "Global. Headquartered in London, UK, with distinct legal entities for US (Associated Talent Inc.) and UK/Global (Associated Talent Limited) operations.",
    "social_media_links": "Instagram: https://instagram.com/grail.talent, LinkedIn: https://uk.linkedin.com/company/grail-talent",
    "content_strategy_analysis": "Instagram content focuses on showcasing represented creators and their brand collaborations (e.g., haircare, skincare, movie premieres), mixed with workplace humor. LinkedIn content is more corporate, highlighting holiday campaigns, new creator signings, platform updates, and promoting its flexible work model to attract talent managers.",
    "social_results": "As of December 2025: Instagram has 6,188 followers and 879 posts. LinkedIn has 8,303 followers.",
    "marketing_strategy": "Marketing centers on highlighting creator success stories and brand partnerships through case studies and testimonials on its social channels. It also promotes a flexible and empowering work environment for talent managers as a recruitment strategy.",
    "technology_offering": "Offers a proprietary platform called GrailX for brands. It also provides new creator dashboards to help talent track their campaigns, contracts, and payments efficiently.",
    "technology_functions": "The GrailX platform provides access to a 9,000+ creator network, flat-fee talent booking, monthly reporting, ad code collection, and dedicated brand promotion to creators (Pro plan).",
    "integrations": "No specific software or platform integrations are publicly mentioned.",
    "other_info": "Nominated for Top Creator Agency at the Creator Agency Awards (Jan 2025). Operates under two legal entities: Associated Talent Limited (UK/Global) and Associated Talent Inc. (US). Its privacy policy was last updated on April 5, 2023.",
    "Monthly traffic av 3 month": "4,830"
  },
  {
    "name": "GOAT (The Goat Agency)",
    "website": "https://goatagency.com/",
    "type": "Agency",
    "Unified Type": "Agency",
    "business_model": "A service-based model for executing end-to-end influencer marketing campaigns, likely based on retainers and performance fees.",
    "pricing": "Minimum campaign size is reported to be $50,000+ or £30,000 per month. Specific pricing models are not publicly disclosed.",
    "offer_usp": "An award-winning global influencer marketing agency that combines human and creator-first content with connected media to help brands 'Influence Everywhere', guaranteeing all deliverables upfront.",
    "sales_points": "Executed over 50,000 campaigns, generating 10 billion+ views. Employs 650+ experts in 37 markets. Acquired by WPP in 2023, enabling massive scaling. Utilizes proprietary AI technology, IBEX, for enhanced decision intelligence. First agency to run paid media through influencers' channels and use influencer content in Amazon's DSP. Official badged TikTok Marketing Partner. Experienced 40% YoY revenue growth in 2022.",
    "positioning": "Positions itself as a global, award-winning social media and influencer marketing agency that spearheads the 'Human Media Revolution' by focusing on full-funnel, data-led, and performance-driven campaigns.",
    "client_profile": "Medium and Large global brands. Notable clients include Snapdragon, Mars Wrigley, NIVEA, Kraken Rum, World Of Warcraft, Calvin Klein, Dell, Meta, Tesco, Uber, and Unilever.",
    "geographical_focus": "Global, with headquarters in London and New York and operations in 37 markets across 6 continents, including China, India, Brazil, and the UAE.",
    "social_media_links": "LinkedIn: https://www.linkedin.com/company/the-goat-agency/, Instagram: https://www.instagram.com/thegoatagency/, TikTok: https://www.tiktok.com/@thegoatagency, X/Twitter: https://twitter.com/TheGoatAgency, YouTube: https://www.youtube.com/channel/UC_7yjB1S-tS-EqIEB6jTIMA, Substack: https://raisedonsocial.substack.com/",
    "content_strategy_analysis": "Social media content is focused on industry leadership, sharing company news (like the TikTok partner announcement), thought leadership blog posts, case studies, and insights into influencer marketing trends. The Substack provides deeper industry analysis.",
    "social_results": "LinkedIn: 164,656 followers. Other specific engagement metrics are not available.",
    "marketing_strategy": "Marketing is driven by PR around its WPP acquisition, high-profile awards, and official partner statuses. Content marketing through its blog and Substack establishes thought leadership. Case studies with quantifiable results are used to demonstrate effectiveness.",
    "technology_offering": "Utilizes IBEX, a proprietary AI-driven discovery and data analytics platform that leverages data from ten years of influencer campaigns.",
    "technology_functions": "IBEX provides enhanced decision intelligence, real-time content performance tracking and analysis, trend spotting, campaign refinement, and data-backed recommendations for influencer selection and pricing.",
    "integrations": "IBEX integrates with the Amazon DSP, allowing the use of influencer content in targeted advertising. The agency is an official partner of TikTok, YouTube, Snapchat, Meta, LinkedIn, Amazon, and Target.",
    "other_info": "Acquired by WPP in March 2023 and merged with GroupM's INCA to operate under the Goat brand. Winner of numerous awards, including Campaign’s Global Social Media Agency of the Year Finalist for three consecutive years. Issued a public warning in September 2025 regarding recruitment scams using its name.",
    "Monthly traffic av 3 month": "61,100"
  },
  {
    "name": "Ubiquitous",
    "website": "https://ubiquitousinfluence.com/",
    "type": "Mix (Agency & Platform)",
    "Unified Type": "Mix (Agency & Platform)",
    "business_model": "A hybrid model offering full-service agency campaign management and a freemium SaaS platform for self-serve users.",
    "pricing": "The self-serve platform has a free plan and a Premium plan for $29/month. For full-service agency campaigns, the minimum budget is $20,000+.",
    "offer_usp": "Offers a completely free influencer marketing platform for brands to scale their efforts, providing access to core features, unlimited seats, and no annual agreements.",
    "sales_points": "Provides free access to its core platform features. Features a creator search tool for a database of 100M+ creators across TikTok, Instagram, and YouTube. Offers competitive brand analysis and campaign monitoring. No long-term contracts for the platform. Works with brands of all sizes, including major names like Lyft, Disney, American Eagle, and Netflix. Utilizes proprietary data for matching and an in-house team for analytics. Offers 'Ubiquitous University' and a TikTok Money Calculator as free resources.",
    "positioning": "Deploys compelling, ingenious influencer marketing campaigns (at scale) on platforms like Instagram, TikTok, and YouTube by combining expert marketers with a powerful data infrastructure.",
    "client_profile": "Targets a wide range of clients, including medium-sized brands, marketers seeking a free data-rich platform, brands of all sizes, and marketing agencies. Notable clients include Disney, Amazon, Netflix, J.Crew, and Target.",
    "geographical_focus": "Operates globally, with a corporate office in Chattanooga, TN and a presence in Los Angeles, CA.",
    "social_media_links": "LinkedIn: https://www.linkedin.com/company/ubiquitous-influencer-marketing, YouTube: https://www.youtube.com/channel/UCmeQp02WM6HKt5cK-8QoCIA, Twitter: https://twitter.com/Ubiquitous_HQ, Instagram: https://www.instagram.com/ubiquitousofficial/, TikTok: https://www.tiktok.com/@ubiquitousofficial, Facebook: https://www.facebook.com/UbiquitousOfficial",
    "content_strategy_analysis": "Social media content is used to promote their services, showcase successful case studies (e.g., a Lyft campaign with 8.1M views), and share thought leadership content. LinkedIn posts often highlight their team, company culture, and industry insights.",
    "social_results": "The curated creator network has a combined following of over 27 billion and has generated 1.4 billion impressions. Specific follower counts for their own social channels were not provided.",
    "marketing_strategy": "The free influencer marketing platform is a primary lead magnet to attract users. The company also uses content marketing, including case studies, 'Ubiquitous University' educational guides, and free tools like an 'Engagement Calculator' to attract and convert leads.",
    "technology_offering": "Offers a proprietary real-time data platform for internal use and a free-to-use self-serve influencer marketing platform for brands.",
    "technology_functions": "The platform's functions include a creator search tool, competitive brand analysis, campaign monitoring with performance tracking, and data export. It does not include negotiation, contracting, or payment processing, which are handled by the agency side.",
    "integrations": "The platform has API access to TikTok data, which enhances its analytics and creator discovery capabilities.",
    "other_info": "Founded in 2021 by Jess Flack. The company is venture capital-backed, having raised $5M in funding. The platform was initially developed for internal agency use before being offered to the public.",
    "Monthly traffic av 3 month": "56,065"
  },
  {
    "name": "Viral Nation",
    "website": "https://www.viralnation.com/\n\nhttps://www.viralnation.com/talent/joinvn",
    "type": "Mix (Agency, Talent Management, Platform)",
    "Unified Type": "Mix (Agency, Talent Management, Platform)",
    "business_model": "Provides end-to-end, social-first marketing services for brands (likely retainer/performance-based) and 360-degree talent representation for creators (commission-based), all augmented by proprietary AI technology.\n\nProvides 360-degree creator representation and acts as a monetization engine for creators and athlete influencers, likely operating on a commission-based model from secured deals.",
    "pricing": "Pricing for services is not publicly disclosed. The minimum campaign size for agency services is reported to be $50,000+.\n\nPricing, including commission rates and exclusivity terms, is not publicly disclosed. The company claims its agents negotiate to secure 33% more value for creators in their deals.",
    "offer_usp": "A global leader in social media innovation, offering a unique combination of full-service agency solutions, proprietary AI-powered technology (CreatorOS™ and Viral Nation Secure™), and top-tier creator representation.\n\nClaims to have the largest creator roster in the world (900+ creators) and offers a 'fully in-house experience' with 'industry-leading, unlimited support' for 360-degree career development.",
    "sales_points": "Developed award-winning proprietary technology, including Viral Nation Secure™ (SXSW Innovation Award winner). Ranked on Deloitte’s Technology Fast 500™ list for 2023. Works with top global brands like Anheuser-Busch, Coca-Cola, Disney, and Microsoft. Screened over 7.6 million videos with its brand safety tech in a six-month period. Exclusive social partner for New York Fashion Week (2025). Launched 'The Culture Quotient (CQ)', an AI-driven framework to measure cultural relevance.\n\nRepresents over 900 diverse creators across 35 verticals. Claims to help creators secure 33% more value in their deals through expert negotiation. Provides a fully in-house, 360-degree representation model, including IP diversification, merchandising, podcasting, and public relations. Features strong testimonials from prominent creators like Steven He and Basement Gang.",
    "positioning": "Positions itself as 'The Global Leader in Social Media Innovation' and a provider of 'Social-First Marketing at Scale,' powering brand reputation management and creator careers.\n\nPositions itself as 'The #1 Talent Representation For Today’s Digital Stars' with the tagline 'We Create Icons.' The focus is on building personal empires for creators that transcend viral content.",
    "client_profile": "Serves global enterprises and large brands across various sectors (Retail, CPG, Gaming, Tech, etc.). Clients include Walmart, Activision Blizzard, Bud Light, and Uber. Also represents over 900 content creators and athletes via its talent division.\n\nRepresents a diverse roster of over 900 content creators and athlete influencers across 35 different content verticals.",
    "geographical_focus": "Global. Headquartered in Mississauga, Canada, with offices in the USA and active in eight countries.\n\nOperates globally as part of the broader Viral Nation entity.",
    "social_media_links": "LinkedIn: Viral Nation Inc., Instagram: @ViralNation, X/Twitter: @ViralNationInc, TikTok: @ViralNationInc, YouTube: @ViralNationInc, Facebook: TheViralNation\nInstagram: https://www.instagram.com/viralnationtalent/(@viralnationtalent). Leverages the main Viral Nation social channels for other platforms.",
    "content_strategy_analysis": "Content is focused on establishing industry leadership and promoting company news. Recent posts highlight the launch of its proprietary measurement framework (CQ), major partnerships with Fremantle and T-Pain, and thought leadership articles on topics like TikTok Shop.\n\nThe dedicated Instagram account focuses on celebrating its represented talent. Recent posts highlight creator achievements (like Steven He's creative journey) and welcome new creators to the roster.",
    "social_results": "Company data sources report 28,386 monthly web visits. Specific follower counts and engagement metrics for social channels were not detailed.",
    "marketing_strategy": "Marketing emphasizes its leadership in social-first transformation by highlighting its proprietary AI technology, high-profile awards (SXSW, Deloitte), and major brand clients through press releases, case studies, and industry announcements.\nMarketing is centered on the promise of building 'personal empires' for creators. It uses powerful testimonials from successful talent to showcase its 360-degree representation and fully in-house support model.",
    "technology_offering": "Offers a suite of proprietary AI solutions: CreatorOS™ (creator intelligence platform), Viral Nation Secure™ (AI-powered brand safety and reputation management), and The Culture Quotient (CQ) (AI-driven cultural relevance measurement framework).\n\nLeverages the proprietary technology of its parent company, Viral Nation, including CreatorOS™ for creator intelligence and Secure™ for brand safety monitoring, which benefits the talent on its roster.",
    "technology_functions": "Services include influencer marketing, performance marketing, social content production, community management, business intelligence, TikTok marketing, creator sourcing and vetting, brand reputation management, and talent representation.\nProvides a comprehensive suite of services: brand deal sourcing, contract support, content strategy, production management, talent publicity, content syndication, platform diversification, OTT & licensing, original programming, podcasting, and merchandising ventures.",
    "integrations": "CreatorOS™ is described as an end-to-end platform that streamlines workflows, but specific third-party software integrations are not publicly named.\nWorks with a global network of streaming partners and platforms for content syndication, but specific software integrations are not mentioned.",
    "other_info": "Founded in 2014 by Joe Gagliese and Mat Micheli. Has acquired Eight Seven Media and MediaKits. It is a certified TikTok Marketing Partner, Meta Business Partner, and member of IAB and ANA. Viral Nation Talent is the talent representation division within the main company.\n\nThis is the talent representation division of the parent company, Viral Nation. A key feature is the promise of a 'fully in-house experience' with 'unlimited support,' differentiating it from agencies that may outsource certain functions.",
    "Monthly traffic av 3 month": "55,165"
  },
  {
    "name": "Clicks Talent",
    "website": "https://clickstalent.com",
    "type": "Agency",
    "Unified Type": "Agency",
    "business_model": "Offers affordable pricing tiers, transparent CPM models, and guaranteed-result packages.",
    "pricing": "Offers transparent pricing with clear options for services such as video creation, posts, link‑in‑bio and licensing rights, emphasising affordability.",
    "offer_usp": "Helps brands make a social splash without a seven-figure budget by making influencer marketing measurable and scalable.",
    "sales_points": "Specializes in Celebrity Endorsements, Social Media Promos, Micro Influencer Marketing, UGC, and TikTok influencer marketing. Represents over 5,000 influencers in 150 niches across 65+ countries. Offers distinct divisions for Influencer Marketing and Celebrity Endorsements.",
    "positioning": "Aims to provide measurable and scalable influencer marketing solutions for brands seeking viral social campaigns on a budget.",
    "client_profile": "Small Businesses and brands looking to grow their presence through viral social campaigns. Notable clients include Warner Bros, Santander, Babbel, Uber Eats, and The Pokémon Company.",
    "geographical_focus": "Operates in the USA, Brazil, Russia, Israel, UK, and Netherlands.",
    "social_media_links": "Instagram: https://www.instagram.com/clickstalent",
    "content_strategy_analysis": "Clicks Talent highlights viral campaign successes and behind‑the‑scenes moments from creator collaborations.  Its social channels focus on authentic storytelling and trend‑driven content across TikTok and Instagram to demonstrate its ability to generate buzz for brands.",
    "social_results": "The agency reports millions of impressions across campaigns.  In one example, a cancer charity campaign run through its Zano platform generated 19,000 views with a 3 % engagement rate.",
    "marketing_strategy": "Clicks Talent markets itself on guaranteed results and affordable influencer campaigns.  It offers both micro‑influencer marketing and celebrity endorsements, emphasising transparent pricing and measurable campaign performance to attract small‑to‑mid‑sized brands.",
    "technology_offering": "Developed the Zano marketplace, a self‑funded platform that connects talent agencies with brands and provides real‑time data on influencer statistics, demographics and pricing.",
    "technology_functions": "Zano automates influencer discovery and casting: it creates instant talent profiles from influencer links, produces auto‑updating media kits, offers a searchable creator database with filters, and distributes casting calls detailing region, niche, deliverables and budget.",
    "integrations": "Zano operates as a live ecosystem connecting talent agencies and brands; specific third‑party software integrations are not publicly disclosed.",
    "other_info": "Clicks Talent generates over $5 million in annual revenue and partners with more than 5,000 influencers across 60+ countries.  The agency invested US$250 k to build Zano and aims to scale it using AI for smarter creator‑brand matchmaking.",
    "Monthly traffic av 3 month": "7,335"
  },
  {
    "name": "AdParlor",
    "website": "https://adparlor.com",
    "type": "Agency",
    "Unified Type": "Agency",
    "business_model": "Service‑based agency model with retainers or project‑based fees for full‑funnel influencer campaigns.",
    "pricing": "Minimum campaign size is reported to be $20,000+.",
    "offer_usp": "A full-service influencer marketing agency that builds custom creator strategies, manages campaigns end-to-end, and amplifies content with precision paid media to drive real results across the funnel.",
    "sales_points": "Offers Full-Funnel Creator Campaigns, UGC + Amplification, Custom Activations, Events & Experiential, and Measurement & Insights. Specializes in amplifying content with precision paid media.",
    "positioning": "A full-service agency focused on delivering real results across the marketing funnel through custom creator strategies and amplified content.",
    "client_profile": "Brands needing full-funnel creator campaigns, UGC amplification, custom activations, events, and detailed measurement.",
    "geographical_focus": "Operates from New York, NY, Kansas City, and Toronto.",
    "social_media_links": "LinkedIn: https://www.linkedin.com/company/adparlor, TikTok: https://www.tiktok.com/@adparlor, Instagram: https://www.instagram.com/adparlor/, Facebook: https://www.facebook.com/AdParlor, Twitter/X: https://twitter.com/AdParlor",
    "content_strategy_analysis": "Supports a wide range of channels for campaigns: Discord, Facebook, Google, Instagram, LinkedIn, Pinterest, Reddit, Snapchat, Spotify, TikTok, Twitch, Twitter (X), and YouTube.",
    "social_results": "Since 2021 AdParlor has managed over 15,000 influencer campaigns, achieving an average 26 % year‑over‑year sales increase and a 4.36× return on ad spend.",
    "marketing_strategy": "AdParlor promotes its ability to deliver full‑funnel creator campaigns that are amplified with precision paid media and measured transparently.  The agency offers free consultations, promises to launch campaigns within 14 days and highlights flexible support to expand client bandwidth quickly.",
    "technology_offering": "Provides data‑driven dashboards and reporting to track influencer ROI and integrates paid media amplification; the focus is on managed services rather than a standalone SaaS platform.",
    "technology_functions": "AdParlor’s process covers strategy development, influencer sourcing and vetting, contracting and negotiation, content creation oversight, campaign launch and paid amplification.",
    "integrations": "Integrates creator content with paid media placements across major social channels such as Facebook, Instagram, TikTok, YouTube and Snapchat; partners with ad‑tech platforms like Show.gg and MNTN for advanced targeting and measurement (details not widely publicised).",
    "other_info": "Operates from offices in New York, Kansas City and Toronto and offers flexible, contract‑free support to help brands scale influencer marketing bandwidth.",
    "Monthly traffic av 3 month": "19,700"
  },
  {
    "name": "The Influencer Marketing Factory",
    "website": "https://theinfluencermarketingfactory.com/",
    "type": "Agency",
    "Unified Type": "Agency",
    "business_model": "Full-service agency model, likely based on retainers or project fees.",
    "pricing": "Minimum campaign size is reported to be $20,000+.",
    "offer_usp": "A global full-service influencer marketing agency that helps brands engage with Gen Z and Millennial audiences on TikTok, YouTube, and Instagram.",
    "sales_points": "Specializes in reaching Gen Z and Millennial audiences. Executed over 1,000 campaigns with 34,000+ influencers. Campaigns have reached over 3 billion people and generated over $150M in client revenue. Offers end-to-end campaign management with a focus on ROAS. Official TikTok Badged Marketing Agency and META Business Partner.",
    "positioning": "A global, full-service, creative powerhouse and an extension of its clients' teams, focused on connecting brands with younger demographics across key social platforms.",
    "client_profile": "Enterprises, Large Brands, and direct-to-consumer (DTC) companies. Notable clients include Google, Meta, Sony Music, Universal Music, Unilever, and Hyundai.",
    "geographical_focus": "Global agency with primary offices in Miami, FL, and New York, NY, and service offerings in Europe (London, Milan).",
    "social_media_links": "LinkedIn: https://www.linkedin.com/company/the-influencer-marketing-factory-influencer-marketing-agency/, Instagram: @influencermarketingfactory, Facebook: influencermarketingfactory. Also supports campaigns on Blog, Twitch, Twitter (X), and YouTube.",
    "content_strategy_analysis": "The Influencer Marketing Factory builds tailored social media strategies that start with goal setting and KPI alignment and include competitor analysis, custom graphics and video creation, and content calendar planning.  Their account management involves daily posting, community engagement and customer service, while analytics and reporting provide real‑time dashboards and monthly performance reports to optimise campaigns.  Storytelling is central to their approach; they craft narratives that connect audiences and encourage interactions across TikTok, Instagram and YouTube, using influencer selection, trend‑setting and targeted promotions to drive millions of views and conversions.",
    "social_results": "LinkedIn: 13,656 followers. A single campaign for BenQ reached over 3 million followers and generated 1.2 million story impressions.",
    "marketing_strategy": "Marketing relies on showcasing case studies with strong metrics, PR from industry recognition (e.g., Inc. 5000 list), and leveraging its official partner badges with TikTok and Meta.",
    "technology_offering": "Utilizes 'in-house tools' for influencer targeting, campaign management, and optimization, along with a 'specific tracking code' for each influencer to analyze performance and attribute conversions.",
    "technology_functions": "Influencer targeting, campaign management, performance optimization, conversion attribution, and ROAS tracking.",
    "integrations": "No specific third-party integrations are publicly named, but it is an official partner of TikTok and Meta.",
    "other_info": "Ranked #340 on the 2023 Inc. 5000 list of fastest-growing private companies. Recognized as a Top 10 Agency by IMH. Finalist in The Drum Marketing Awards USA.",
    "Monthly traffic av 3 month": "36,500"
  },
  {
    "name": "Socially Powerful",
    "website": "https://sociallypowerful.com/",
    "type": "Agency",
    "Unified Type": "Agency",
    "business_model": "Full-service agency model, offering flexible pricing including pay-per-post, pay-per-click, and performance-based structures.",
    "pricing": "Minimum campaign size is reported to be $50,000+. However, the agency notes it offers transparent pricing and caters to startups and brands with limited budgets.",
    "offer_usp": "A global social and influencer marketing agency that guarantees results, promising that if agreed-upon KPIs are not met, the client does not pay.",
    "sales_points": "Guarantees campaign results. Employs over 150 experts speaking 20+ languages. Delivers campaigns in over 40 countries. Offers a proprietary AI-powered platform, ARIA, to clients for free. Manages product seeding for over 100,000 recipients annually. Has a strong track record with Fortune 500 brands.",
    "positioning": "A global 'powerhouse' at the intersection of culture, trends, and consumer attention, built to help brands untangle the complex interplay of social media, influencer marketing, and paid media.",
    "client_profile": "A mix of global Fortune 500 brands and fast-growing disruptors across beauty, fashion, tech, automotive, retail, and CPG. Clients include Amazon, TikTok, L'Oréal, Red Bull, ULTA Beauty, and Toyota.",
    "geographical_focus": "Global, with headquarters in London and international hubs in New York, Dubai, Beijing, and Los Angeles.",
    "social_media_links": "LinkedIn: Socially Powerful, X/Twitter: @socialpowerful, Facebook: sociallypowerfulmarketing, Instagram: @sociallypowerful. Supports campaigns on all major platforms including TikTok Shop, Amazon, Weibo, and WeChat.",
    "content_strategy_analysis": "Socially Powerful positions brands at the heart of culture by delivering real‑time social media marketing campaigns backed by data.  Their content strategy begins with an A‑to‑Z analysis that includes clarifying campaign goals, audiences and objectives and then reverse engineering a plan to maximise engagement.  They focus on sparking reactions through creative concepts while continuously measuring performance to drive action and ensure ROI.",
    "social_results": "Has generated over 500 million social impressions. A campaign for Leffe resulted in over 4 million views. Professional profiles show 139 employees.",
    "marketing_strategy": "Marketing is driven by its unique 'guaranteed results' promise, case studies showcasing major brand successes (e.g., Kahlua, Amazon Fashion), and promotion of its free proprietary AI platform, ARIA.",
    "technology_offering": "Offers ARIA, its proprietary AI-powered influencer marketing platform, to clients for free to accelerate and enhance campaigns.",
    "technology_functions": "ARIA's functions include AI-driven search, campaign visualization, predictive analytics, visual search, natural language prompts, automated outreach, and real-time campaign tracking with detailed ROI analysis.",
    "integrations": "Specific third-party integrations for ARIA are not publicly detailed. The agency leverages the Amazon Creator Marketplace.",
    "other_info": "Privately held. Won the David Ogilvy Award for Best Brand Transformation in 2024 for its Kahlua campaign. Its ARIA platform was recognized in the HelloPartner Top 30 Influencer Technology 2024 list.",
    "Monthly traffic av 3 month": "55,235"
  },
  {
    "name": "Upfluence",
    "website": "https://www.upfluence.com/",
    "type": "Platform",
    "Unified Type": "Platform",
    "business_model": "Subscription-based SaaS model with custom pricing.",
    "pricing": "Pricing is custom and available upon request via a demo. Third-party sources indicate plans generally start at $2,000 per month with a required minimum 12-month contract.",
    "offer_usp": "An AI-powered, all-in-one influencer and affiliate marketing platform that streamlines the entire program lifecycle from discovery to payments, with strong e-commerce integrations.",
    "sales_points": "AI-powered creator discovery and matching (Jace AI) claims to save users 20+ hours weekly. Manages the entire program lifecycle, including contracting, content approvals, and global payments. Extensive e-commerce integrations (Shopify, WooCommerce, Magento, etc.) for product seeding and sales tracking. Integrates with CRMs and marketing automation tools like Salesforce and Klaviyo. Trusted by over 1,600 clients worldwide, including Amazon and Nestlé. Offers a 100% commission-free affiliate program management system.",
    "positioning": "Provides a comprehensive, end-to-end, AI-driven solution for influencer and affiliate marketing programs, particularly for e-commerce brands.",
    "client_profile": "E-commerce brands, marketing agencies, consumer goods companies, and technology firms of all sizes. Notable clients include Amazon, Marriott, Asics, and Universal Music.",
    "geographical_focus": "Global.",
    "social_media_links": "Supports campaigns on Instagram, YouTube, Facebook, Twitch, TikTok, Twitter, Pinterest, and blogs.",
    "content_strategy_analysis": "Upfluence leverages content marketing to keep brands informed about emerging trends and e‑commerce events.  Its blog regularly publishes educational articles on topics like Gen Z and AI trends in the creator economy, the impact of Amazon Prime Day versus Black Friday, influencer campaign checklists and guides to maximize Black Friday and Prime Day sales.  By releasing timely trend reports and how‑to guides, Upfluence positions itself as a thought leader and drives inbound interest from brands looking to stay ahead in the creator economy.",
    "social_results": "A published case study highlights generating over $15.4 million in sales for a luxury retail client. Platform has a database of over 12 million influencers.",
    "marketing_strategy": "Marketing relies on offering free tools like a Chrome extension and a Fake Follower Checker. It promotes its platform through demos and showcases success with detailed case studies and performance claims (e.g., 14x ROI).",
    "technology_offering": "An AI-powered platform featuring 'Jace AI' for automated outreach and campaign creation, and 'Jace Reply' for generating communication responses.",
    "technology_functions": "Influencer search & discovery, relationship management (IRM), campaign management, third-party analytics, automated recruiting, influencer lifecycle management, content review, campaign reporting, audience analysis, e-commerce tools (gifting/seeding), payment processing, social listening, and affiliate management.",
    "integrations": "Extensive integrations including Shopify, WooCommerce, Magento, BigCommerce, Amazon Attribution, Salesforce, HubSpot, Klaviyo, Zapier, Stripe, PayPal, and Hootsuite.",
    "other_info": "Founded in 2013. Successfully completed a SOC 2 audit as of June 2024, demonstrating a strong commitment to data security. Rated 4.8/5 by Influencer Marketing Hub.",
    "Monthly traffic av 3 month": "389,100"
  },
  {
    "name": "Whalar",
    "website": "https://whalar.com/",
    "type": "Mix (Agency & Platform)",
    "Unified Type": "Mix (Agency & Platform)",
    "business_model": "Operates as a high-end agency with a minimum campaign size of $100,000+. It also offers a freemium SaaS platform, Foam.io, for talent managers.",
    "pricing": "Agency services have a minimum campaign size of $100,000+. The Foam.ioplatform for talent managers is free to use, with optional paid upgrades planned for the future.",
    "offer_usp": "An end-to-end Creator ecosystem, recognized as the 'Most Awarded Creator Company,' that combines a premium global agency with a specialized technology platform (Foam.io) for talent management.",
    "sales_points": "Operates a full creator ecosystem including an agency, talent management (Sixteenth, C Talent), a gaming studio, and a venture studio. Foam.io platform powers over 40,000 creators with first-party, API-sourced data. Holds global partnerships with LinkedIn, Meta, Snapchat, TikTok, and YouTube. Winner of numerous awards including Adweek Agency of the Year and Ad Age A-List Social Media/Influencer Agency of the Year. Acquired C Talent to better represent Deaf and Disabled talent.",
    "positioning": "Positions itself as a leader in the creator economy with a mission for the 'liberation of the creative voice.' It serves as an end-to-end ecosystem for both brands (via Whalar agency) and talent managers (via Foam.io).",
    "client_profile": "The Whalar agency targets large, global brands requiring premium campaign management. The Foam.ioplatform is designed exclusively for talent managers, creator agencies, and brand partners.",
    "geographical_focus": "Global, with offices in Los Angeles, New York, London, and Berlin, and a team of over 200 specialists across North America, Europe, APAC, and MENA.",
    "social_media_links": "Whalar: Instagram, LinkedIn, TikTok, Facebook, Twitter. Foam.io: LinkedIn.",
    "content_strategy_analysis": "Whalar positions brands as cultural drivers by tapping into the creative power of creators.  Its approach follows a build→activate→measure→scale framework: the team researches and plans campaigns, produces and activates content across multiple platforms, measures results and insights, and then scales what works.  Whalar combines creator‑led storytelling with paid media to deliver authentic content and drive measurable ROI.",
    "social_results": "Whalar’s campaigns deliver strong performance; an independent Nielsen study found that its creator campaigns drive an ROI of $2.41 for every $1 invested (a 2.4× return) and that creators generate 300 % of the impact while accounting for less than 1 % of total media share.",
    "marketing_strategy": "Marketing is heavily driven by PR from its numerous prestigious awards, high-profile global partnerships, and thought leadership on the creator economy. The freemium model of Foam.ioserves as a key entry point for the talent management community.",
    "technology_offering": "The core technology is Foam.io, described as a 'decision engine' and 'Bloomberg Terminal for creator management.' It serves as a digital operating system for talent managers.",
    "technology_functions": "Foam.io centralizes multi-platform metrics, provides AI-generated 'Smart Profiles' for creator onboarding, facilitates pitching with 'Media Kits' and 'Talent Rosters,' detects fake followers and engagement spikes, and analyzes vanishing content. A Chrome Extension embeds real-time data into email workflows.",
    "integrations": "Foam.io has direct certified API access to Instagram, TikTok, YouTube, and Snap for live, first-party data. Whalar is an official marketing partner of Meta, YouTube, TikTok, and Snapchat.",
    "other_info": "Whalar Group is a B Corp certified company. It acquired C Talent, a disabled-led talent management firm, in 2022. The ecosystem also includes a physical creator campus called The Lighthouse.",
    "Monthly traffic av 3 month": "9,535"
  },
  {
    "name": "Creator.co",
    "website": "https://www.creator.co/",
    "type": "Platform (Marketplace)",
    "Unified Type": "Platform",
    "business_model": "Subscription-based SaaS model for brands with tiered plans and a 3-month minimum commitment. Creators are charged a 5% processing fee on earnings.",
    "pricing": "Brand plans range from 'Startup' ($460/month) to 'Bespoke' ($3,495/month), plus a one-time $395 onboarding fee. Add-ons like Affiliate Marketing ($95/mo) are available. Annual billing offers a 15% discount.",
    "offer_usp": "A comprehensive, all-in-one influencer marketing solution with a searchable database of over 300 million influencers and a vetted network of 250,000+ opt-in creators.",
    "sales_points": "Offers both DIY software and full-service management. Features a massive searchable database of 300M+ influencers. AI-powered tools for discovery and automated outreach. Real-time dashboard tracks content performance, conversions, and ROAS. Integrates with Shopify, TikTok Shop, and major affiliate networks. Proven results with clients like Oakley (176% ROI) and Fender (5x ROI).",
    "positioning": "An all-in-one influencer marketing solution and collaboration hub that provides real-time campaign control and streamlined management for brands of all sizes.",
    "client_profile": "Caters to a range of brands from startups to large enterprises. Notable clients include Oakley, Fender, Groupon, Best Buy Canada, Nike, and Charlotte Tilbury.",
    "geographical_focus": "Global.",
    "social_media_links": "Not provided in context.",
    "content_strategy_analysis": "Creator.co provides a full‑service influencer marketing solution that covers the entire campaign lifecycle.  Campaign managers set SMART goals and KPIs, then use advanced AI and human expertise to identify and recruit creators who align with the brand’s objectives.  The team handles negotiation, activation and nurturing while the platform manages logistics and keeps everything on schedule.  Campaigns conclude with detailed cross‑platform reporting and optimization based on performance insights.  The company also offers social media management add‑ons, providing tailored content strategies, community engagement and monthly reporting to capitalise on campaign momentum.",
    "social_results": "Proven results include 7 million+ views for Bellroy and a 427% higher reach for Hund Denmark.",
    "marketing_strategy": "Marketing is driven by showcasing strong ROI in case studies with well-known brands and being recognized as a 'Leader' by G2.",
    "technology_offering": "A comprehensive platform featuring a 'Collaboration Hub' for campaign management and AI-powered tools for discovery.",
    "technology_functions": "Creator discovery, campaign brief builder, automated outreach, direct chat, content approval dashboard, payment management, product shipment tracking, and real-time analytics.",
    "integrations": "Integrates with Shopify, TikTok Shop, Google Analytics, and affiliate networks including Rakuten, Impact, Awin, and Refersion.",
    "other_info": "Recognized as a Leader by G2 in its Summer 2024 report. Some users have reported issues with payout and deposit processes. There is no formal, upfront creator vetting process; quality control is managed at the campaign level by the brand.",
    "Monthly traffic av 3 month": "98,235"
  },
  {
    "name": "Statusphere",
    "website": "https://www.statusphere.com/",
    "type": "Platform",
    "Unified Type": "Platform",
    "business_model": "A managed service powered by a technology platform, with custom plans for brands.",
    "pricing": "Pricing is not publicly displayed; brands must request a custom price or an interactive demo.",
    "offer_usp": "An AI-driven micro-influencer platform designed for consumer brands to generate thousands of micro-influencer posts at scale without any manual outreach, negotiation, or management.",
    "sales_points": "Saves brands 98% of the time typically spent on micro-influencer marketing. Automates the entire process, including influencer matching, fulfillment, and post verification, using its proprietary AI, StevieOps™. Guarantees a steady stream of rights-ready content to support an 'always-on' strategy. Manages all fulfillment, shipping, and handling of products to creators. Provides unlimited content downloads with built-in rights.",
    "positioning": "Provides a fully automated, scalable solution for consumer brands to execute micro-influencer marketing and generate user-generated content with minimal hands-on effort.",
    "client_profile": "Busy consumer brands that need to scale their micro-influencer marketing and UGC generation efficiently.",
    "geographical_focus": "Global.",
    "social_media_links": "Active on TikTok, Instagram, LinkedIn, and Facebook.",
    "content_strategy_analysis": "Statusphere’s micro‑influencer platform automates creator sourcing and logistics, freeing brands from manual outreach.  The platform uses AI tools like SmartMatch and StevieOps to match brands with relevant creators, handle shipping and payments, and automate campaign tasks.  Brands can activate thousands of creators quickly—Statusphere reports that it can activate over 1,000 creators in an hour—so campaigns scale efficiently.",
    "social_results": "According to Statusphere, its campaigns deliver significant results: brands have achieved an average 5× return on ad spend, experienced an 80 % increase in social searches, and received thousands of influencer posts with minimal effort.",
    "marketing_strategy": "Marketing focuses on the value proposition of saving time and automating the complex process of micro-influencer marketing. It targets busy consumer brand marketers through demos and custom quotes.",
    "technology_offering": "A 100% AI-powered micro-influencer platform featuring a proprietary AI campaign operator called 'StevieOps™'.",
    "technology_functions": "Automated influencer matching, campaign execution, fulfillment and product seeding management, post verification, and reporting.",
    "integrations": "Specific integrations are not detailed, but its focus on consumer brands suggests relevance to e-commerce ecosystems.",
    "other_info": "Founded by Kristen Wiley. Rated 4.6/5 on Capterra. The platform focuses exclusively on a vetted community of micro-influencers.",
    "Monthly traffic av 3 month": "198,800"
  },
  {
    "name": "Influencity",
    "website": "https://influencity.com/",
    "type": "Platform",
    "Unified Type": "Platform",
    "business_model": "SaaS model with transparent, tiered pricing and a 7-day free trial.",
    "pricing": "Offers tiered plans: Standard ($649/month for 1,000 creators), Pro ($1,049/month for 5,000 creators), and Business ($2,490/month for 10,000 creators). Enterprise, Custom, and Agency plans are also available. No mandatory contract period.",
    "offer_usp": "An end-to-end, data-driven influencer platform that integrates discovery, relationship management, and analytics with powerful social listening capabilities for agencies and global brands.",
    "sales_points": "AI-powered discovery scans over 300 million influencers and tracks 200 million+ global creators. Offers transparent, flexible pricing with a free trial and no long-term contracts. Provides a full-stack platform with six core tools: Discover, IRM, Campaign Manager, Reports, Social Hub, and Monitoring. Strong e-commerce integrations with Shopify and WooCommerce. Features a powerful social listening tool that uses generative AI to discover trends. Provides detailed analytics including follower quality and earned media value.",
    "positioning": "A comprehensive, AI-powered platform for agencies and global brands to professionalize and manage all aspects of their influencer marketing strategies at scale.",
    "client_profile": "Agencies and global brands. Trusted by brands in over 70 countries, with testimonials from major agencies like Dentsu and Cheil Spain.",
    "geographical_focus": "Global. Founded in Spain, with headquarters now in Madrid.",
    "social_media_links": "Supports campaigns on Instagram, TikTok, YouTube, Facebook, Pinterest, Snapchat, X (formerly Twitter), and Twitch.",
    "content_strategy_analysis": "Influencity’s platform unifies influencer discovery, relationship management, campaign management and reporting in one hub.  It provides access to a database of more than 200 million global creator profiles and uses AI to deliver deep audience insights, including demographics, engagement and fake‑follower checks.  Its Social Listening module monitors over 100 million sources and offers real‑time alerts for brand mentions and trends, while the Social Hub centralises content creation and scheduling across Instagram, TikTok, YouTube and Facebook.",
    "social_results": "Influencity reports that its discovery tool tracks 200 million creators and that its Social Listening engine monitors over 100 million sources for real‑time insights.  These capabilities help brands identify the best influencers and monitor campaign impact at scale.",
    "marketing_strategy": "Marketing strategy includes offering a 7-day free trial and a suite of free tools (Fake Follower Scanner, Engagement Rate Calculator) to attract users. Its transparent pricing is a key differentiator and marketing point.",
    "technology_offering": "A full-stack influencer marketing platform with an AI engine for discovery and generative AI for its social listening feature.",
    "technology_functions": "Influencer discovery with advanced filters, influencer relationship management (IRM), campaign management, real-time reporting, social listening and monitoring, fake follower detection, audience analysis, and product seeding management.",
    "integrations": "Integrates with Shopify, WooCommerce, HubSpot, and Salesforce. Supports multi-currency payments.",
    "other_info": "Founded in 2014 in Valencia, Spain. Listed as a major vendor in the global influencer marketing platform market.",
    "Monthly traffic av 3 month": "133,900"
  },
  {
    "name": "TRIBE",
    "website": "https://www.tribegroup.co/",
    "type": "Platform (Marketplace)",
    "Unified Type": "Platform",
    "business_model": "A pitch-based marketplace model. Brands pay an annual fee plus a 30% margin on campaign spend. Creators set their own fees.",
    "pricing": "Requires an annual agreement and a minimum campaign budget of $2,500. TRIBE charges a 30% margin on the total campaign spend. A 'Pay-Per-Use' option with an additional 'Activation Fee' is available outside the US and Canada. Creators can opt for faster payment (48 hours) by paying a 10% fee.",
    "offer_usp": "An influencer marketplace that connects brands with a curated network of 70,000+ creators who pitch unique content ideas in response to a brand's brief.",
    "sales_points": "Access to a curated network of 70,000+ creators. Pitch-based model ensures brands receive creative ideas upfront. Centralized campaign management from a single dashboard. Utilizes 'BrandMatch AI' for creator discovery. Provides real-time results using first-party data from TikTok, Instagram, and Pinterest APIs. Employs an 'AVS' system for brand safety, checking creators four times a day.",
    "positioning": "Empowers brands to build, manage, and measure creator communities by accessing a large network of creators and running campaigns with centralized management and first-party data.",
    "client_profile": "Primarily larger brands with significant marketing spend, given the pricing model. Notable clients include Unilever, Amazon, American Express, Facebook, Mars, Diageo, Maybelline New York, and Adobe.",
    "geographical_focus": "Global, with a presence in the USA, Australia, England, and the Philippines.",
    "social_media_links": "Instagram, Twitter, LinkedIn and Facebook (icons linking to TRIBE’s social profiles are displayed on the site).",
    "content_strategy_analysis": "TRIBE positions itself as a creator marketing partner that combines technology with human expertise.  Its platform helps brands build, manage and measure a community of over 70,000 opt‑in creators and offers one‑to‑one support from a Community Management team.  Brands can execute campaigns using a centralised platform that streamlines communication, approvals, legal and payment processes, while real‑time analytics from TikTok, Instagram and Pinterest APIs enable data‑led decision‑making.  A dedicated customer success team provides onboarding, campaign management and performance measurement to optimise results.",
    "social_results": "Has facilitated over 10,000 campaigns for 6,000+ brands and paid out over $34 million to creators.",
    "marketing_strategy": "Marketing is driven by showcasing successful campaigns with major global brands and highlighting the unique pitch-based model that gives brands creative control.",
    "technology_offering": "A marketplace platform featuring 'BrandMatch AI' for discovery and direct API integrations for first-party data analytics.",
    "technology_functions": "Campaign brief builder, creator pitching workflow, content approval system, centralized campaign management, and real-time analytics dashboard.",
    "integrations": "Direct API integrations with TikTok, Instagram, Snapchat, and Pinterest for data. Offers tools to boost organic posts into paid ads on Meta, TikTok, and Pinterest.",
    "other_info": "Founded in 2014. The platform fee is only charged on content that the brand approves and purchases.",
    "Monthly traffic av 3 month": "86,500"
  },
  {
    "name": "Influential",
    "website": "https://influential.co/",
    "type": "Mix (Agency & Platform)",
    "Unified Type": "Mix (Agency & Platform)",
    "business_model": "Operates as a brand-facing platform and agency, offering custom enterprise plans.",
    "pricing": "Pricing is not publicly disclosed. Interested parties must request a demo for a custom enterprise plan.",
    "offer_usp": "An AI-powered social data and conversion technology platform, and an unrivaled global leader in influencer marketing, deeply integrated with IBM Watson.",
    "sales_points": "Deep integration with IBM Watson for brand safety, tone analysis, and personality-based matching. Applies machine learning to over a decade of campaign data (100 billion data points). Measures offline conversions, including foot traffic and in-store sales. Trusted by over 60% of the Fortune 500. Has run over $1 billion in influencer campaigns and generated over $2.5 billion in measurable sales for partners. Acquired by Publicis Groupe in 2024.",
    "positioning": "Positions itself as the unrivaled global leader in influencer marketing, leveraging a sophisticated AI-driven platform for highly precise and effective campaigns.",
    "client_profile": "Fortune 500 brands. Notable clients include Wells Fargo, McDonald's, NFL, Hyundai, Walmart, Pepsi, and Toyota.",
    "geographical_focus": "Global, with offices in Los Angeles, NYC, and Las Vegas.",
    "social_media_links": "Facebook, LinkedIn, Twitter.",
    "content_strategy_analysis": "Influential uses IBM Watson’s natural language processing and machine‑learning capabilities to match brands with influencers based on audience psychographics, brand affinity and predicted content performance.  The platform analyses vast amounts of social data to identify creators whose audience values and behaviour align with a brand’s target market, and it can predict engagement, reach and conversion outcomes to improve campaign planning.  According to Influential, clients using its AI‑powered platform experience on average a 25 % increase in brand awareness and a 30 % increase in sales.",
    "social_results": "Eclipsed $500M in revenue by 2022.",
    "marketing_strategy": "Marketing is driven by its high-profile acquisition by Publicis Groupe, its unique IBM Watson partnership, and case studies demonstrating massive sales and ROI for Fortune 500 clients.",
    "technology_offering": "An advanced AI-driven platform named 'Radius,' which is deeply integrated with IBM Watson's Natural Language Understanding and Personality Insights APIs.",
    "technology_functions": "AI-powered creator discovery, brand-influencer matching based on 47 personality traits, brand safety analysis (profanity, tone), computer vision for image analysis, and measurement of offline conversions.",
    "integrations": "Developer partner of IBM Watson. Strategic partner of WME and Oracle. Facebook and Instagram Marketing Partner. API partnerships with all major social media platforms. Preferred partnerships with Circana, Advantage Solutions, Amazon, and LiveRamp for conversion tracking.",
    "other_info": "Founded in 2013. Acquired by Publicis Groupe on July 25, 2024. Previously raised over $40.3 million in funding. Does not rely on third-party data, instead using anonymized first-party data from influencer followers.",
    "Monthly traffic av 3 month": "21,000"
  },
  {
    "name": "The Shelf",
    "website": "https://theshelf.com/",
    "type": "Agency",
    "Unified Type": "Agency",
    "business_model": "A service-based influencer marketing agency offering full-service campaign management supported by a proprietary platform.",
    "pricing": "Pricing is customised for each campaign and not publicly listed.",
    "offer_usp": "A data-first influencer marketing agency specializing in precise influencer matching, content optimization, and detailed reporting.",
    "sales_points": "Emphasizes a data-first approach to campaign strategy. Focuses on optimizing campaigns through precise influencer matching and content optimization. Provides detailed, comprehensive reporting and analytics.",
    "positioning": "A data-driven agency that optimizes influencer campaigns through precise matching and comprehensive analytics.",
    "client_profile": "Mid‑to‑large brands and advertisers seeking creative, data‑driven influencer campaigns.",
    "geographical_focus": "Global, with a strong presence in the United States.",
    "social_media_links": "Instagram: https://www.instagram.com/theshelfinc; LinkedIn: https://www.linkedin.com/company/theshelfinc; Facebook: https://www.facebook.com/theshelf; Twitter: https://twitter.com/theshelfinc",
    "content_strategy_analysis": "The Shelf positions itself as an award‑winning, data‑first influencer marketing company that “hacks the algorithm” with outrageous creativity and data‑backed insights. Its site promises to turn cultural relevance into repeatable, measurable success and to make influencer campaigns scalable and performance‑driven. The agency champions creative excellence and uses proprietary SaaS technology to remove campaign logistics, allowing it to focus on bold, culture‑driven storytelling and precise, data‑informed influencer matching. By combining a global perspective with local expertise and analysing billions of social posts, The Shelf crafts campaigns that set the standard and keep brands culturally relevant.",
    "social_results": "According to its site, The Shelf boasts a 95 % client renewal rate and over a decade of creative excellence. The company has analysed more than one billion social posts and is a five‑time Inc. 5000 honouree.",
    "marketing_strategy": "The Shelf markets itself through thought‑leadership content and case studies that demonstrate how it combines data‑driven insights with bold creative ideas. It emphasises its ability to “hack the algorithm” by blending cultural relevance with measurable performance and positions its proprietary platform as a differentiator that turns influencer marketing into repeatable success.",
    "technology_offering": "A proprietary SaaS platform that streamlines influencer campaign logistics, creator discovery and performance analytics.",
    "technology_functions": "Automated influencer sourcing, data‑driven matching, campaign workflow management, content optimisation and comprehensive analytics reporting.",
    "integrations": "Integrates campaigns across major social platforms such as Instagram, TikTok, YouTube and Facebook.",
    "other_info": "The Shelf has been recognised as a five‑time Inc. 5000 honouree and analyses over one billion posts to inform its data‑driven campaigns.",
    "Monthly traffic av 3 month": "20,965"
  },
  {
    "name": "Purple Goat",
    "website": "https://www.purplegoatagency.com/",
    "type": "Agency",
    "Unified Type": "Agency",
    "business_model": "Not publicly disclosed, likely a service-based agency model.",
    "pricing": "Not publicly disclosed.",
    "offer_usp": "An inclusive influencer marketing agency focused on disability representation, delivering managed campaigns with an emphasis on authenticity and global reach.",
    "sales_points": "Specializes in disability representation in marketing. Delivers fully managed campaigns with a focus on authenticity. Aims for global reach with its campaigns.",
    "positioning": "A unique agency promoting inclusivity and authentic representation of disability within the influencer marketing landscape.",
    "client_profile": "Brands that prioritise inclusivity and want to authentically represent disability communities in their marketing.",
    "geographical_focus": "Global.",
    "social_media_links": "Instagram: https://www.instagram.com/purplegoatagency; LinkedIn: https://www.linkedin.com/company/purple-goat-agency; TikTok: https://www.tiktok.com/@purplegoatagency; YouTube: https://www.youtube.com/@purplegoatagency; Twitter: https://twitter.com/purplegoatagency; Facebook: https://www.facebook.com/purplegoatagency",
    "content_strategy_analysis": "Purple Goat calls itself “The Inclusive Marketing Agency” and focuses on creating innovative and authentic campaigns that deliver real business results. The agency prides itself on exceptional creative, content and campaigns while confidently representing and communicating a narrative around disability. More than half of the team are disabled, allowing Purple Goat to bring lived experience to its storytelling and to educate clients on accessibility and inclusion. Their approach integrates disabled talent at every stage, helping brands challenge misconceptions and build genuine connections with the disability community.",
    "social_results": "Purple Goat highlights its multi‑award‑winning status, including winning “Diversity and Inclusion Company of the Year” and “Best Boutique Influencer Marketing Agency,” recognising its success in delivering inclusive campaigns.",
    "marketing_strategy": "The agency markets itself by emphasising inclusivity, authenticity and representation. By showcasing campaigns that centre disabled voices and by educating brands on accessibility, Purple Goat positions itself as the go‑to partner for inclusive marketing. Awards and thought‑leadership content reinforce its reputation as the leader in disability representation.",
    "technology_offering": "Not applicable – Purple Goat operates as a service‑based agency rather than a technology platform.",
    "technology_functions": null,
    "integrations": "Produces campaigns across mainstream social platforms such as Instagram, TikTok and YouTube.",
    "other_info": "Founded in 2020, Purple Goat is based in London and has been recognised with multiple awards for diversity and inclusion. Over half of its staff are disabled, underscoring its commitment to authentic representation.",
    "Monthly traffic av 3 month": "9,265"
  },
  {
    "name": "Ykone",
    "website": "https://ykone.com/",
    "type": "Mix (Agency, Technology, Talent Management)",
    "Unified Type": "Mix (Agency & Platform)",
    "business_model": "Primarily a service-based model for campaigns, supported by its proprietary technology (Campaygn) and talent management division (BOLD Management).",
    "pricing": "Pricing is not publicly disclosed. Access to the Campaygn platform is available via a demo request, suggesting custom pricing models.",
    "offer_usp": "A global influencer marketing group specializing in luxury, beauty, and fashion, that delivers a 360° approach by combining creative strategy, data-led intelligence via its proprietary tech (Campaygn), and in-house production.",
    "sales_points": "Global presence with 16 offices in 18 territories. Employs over 300 professionals. Reported a turnover of €100 million. Utilizes a proprietary, advanced analytics platform, 'Campaygn,' which monitors 44 million influencer profiles. Operates an in-house production studio ('Oddly Enough') and a physical studio space in Dubai ('YKONE House'). Winner of 'Influencer Marketing Agency of the Year' in Paris for four consecutive years (2021-2024).",
    "positioning": "An international agency leveraging technology, data, and high-end creative production for optimized influencer marketing campaigns, with a strong focus on the luxury, beauty, and lifestyle sectors.",
    "client_profile": "Major global brands in the luxury, beauty, lifestyle, fashion, and travel sectors. Client roster includes Louis Vuitton, Givenchy, L'Oréal, P&G, Chopard, Mastercard, Guerlain, and Nespresso.",
    "geographical_focus": "Global, with a significant presence across Europe, the Middle East, Asia, and the United States. Offices include Paris, Milan, Shanghai, Dubai, and London.",
    "social_media_links": "LinkedIn: YKONE, Instagram: @ykoneagency",
    "content_strategy_analysis": "LinkedIn content showcases high-profile client campaigns (e.g., for Renault, Gucci), company news such as awards and partnerships, and thought leadership on influencer marketing, focusing on brand success and industry recognition.",
    "social_results": "Reported revenue of €76.4 million in 2023. LinkedIn profile has 30,218 followers.",
    "marketing_strategy": "Marketing is driven by PR from its numerous awards (e.g., Financial Times Growth Champion), high-profile client work showcased on social media, and promoting its proprietary Campaygn platform through demos.",
    "technology_offering": "Features 'Campaygn,' an in-house proprietary and highly advanced analytics platform developed since 2015. A forthcoming version will feature AI to guide decisions and recommend actions.",
    "technology_functions": "Campaygn is used to find and qualify influencers, vet profiles (analyzing follower growth, demographics, 'inactive' followers), manage campaigns, measure ROI, and conduct competitive analysis with dynamic leaderboards.",
    "integrations": "The Campaygn platform identifies and analyzes influencers across Instagram, TikTok, and YouTube. No specific official partner badges (e.g., Meta, TikTok) were mentioned in the provided information.",
    "other_info": "Founded in 2008. Acquired by auFeminin.com according to one data source. Has expanded through investments in other agencies like Atlas Agency. The group includes talent management division BOLD Management and performance agency Kyn.",
    "Monthly traffic av 3 month": "13,565"
  },
  {
    "name": "Afluencer",
    "website": "https://afluencer.com/",
    "type": "Platform (Marketplace)",
    "Unified Type": "Platform",
    "business_model": "A freemium, self-serve marketplace with a month-to-month subscription model for both brands and influencers. There are no platform commissions on deals.",
    "pricing": "For Brands: Free plan available. Paid plans include VIP ($49/mo), Concierge ($99/mo), and Boss ($199/mo). For Influencers: Free plan available. Paid plans include Macro-Influencer ($29/mo) and Mega-Influencer ($79/mo).",
    "offer_usp": "An accessible and cost-effective influencer marketplace that helps small businesses, startups, and brands find and partner with influencers for collaborations and sponsored content.",
    "sales_points": "Free to join for brands. No platform commissions on transactions. Direct communication and negotiation between brands and creators. User-friendly interface designed for businesses with limited budgets. Offers dedicated apps for Shopify and BigCommerce to facilitate product seeding. Network of over 29,000 influencers.",
    "positioning": "A user-friendly and affordable marketplace designed to facilitate direct connections and partnerships between brands (especially SMBs and startups) and influencers.",
    "client_profile": "Small businesses, startups, 'solo side hustlers,' and influencers looking for brand partnerships.",
    "geographical_focus": "Global.",
    "social_media_links": "Not provided in context.",
    "content_strategy_analysis": "Not provided in context.",
    "social_results": "Network of over 29,000 influencers.",
    "marketing_strategy": "The freemium model is the primary marketing tool to attract a large user base of small businesses. The platform is marketed as an easy and affordable entry point into influencer marketing.",
    "technology_offering": "A self-serve marketplace platform with a directory and built-in messaging tools.",
    "technology_functions": "Creator directory with search filters (niche, location, follower count), collaboration posting, direct messaging for negotiation, and product catalog import via e-commerce apps.",
    "integrations": "Offers dedicated apps for Shopify (the 'Shopify VIP' app) and BigCommerce.",
    "other_info": "The platform emphasizes a self-serve model, meaning brands are responsible for all vetting, negotiation, and management. Some user skepticism has been noted regarding its suitability for established brands.",
    "Monthly traffic av 3 month": "144,865"
  },
  {
    "name": "Later Influence (previously Mavrck)",
    "website": "https://later.com/influencer-marketing-platform/",
    "type": "Platform",
    "Unified Type": "Platform",
    "business_model": "A subscription-based SaaS platform for enterprise influencer marketing.",
    "pricing": "Pricing is customised and available on request.",
    "offer_usp": "An enterprise-grade, full-service influencer marketing software used by major brands for comprehensive campaign management from discovery to measurement.",
    "sales_points": "Used by major global brands like Disney, Crocs, Express, and Netflix. Provides full-service software capabilities for large-scale programs. Enables brands to manage their influencer marketing programs end-to-end.",
    "positioning": "An enterprise-grade software solution for large brands to discover, activate, and manage their influencer marketing programs.",
    "client_profile": "Large brands and enterprises. Notable clients include Disney, Crocs, Express, and Netflix.",
    "geographical_focus": "Global.",
    "social_media_links": "Instagram, Facebook, Pinterest, TikTok, LinkedIn, YouTube, Threads, Snapchat",
    "content_strategy_analysis": "Later positions its influencer platform as an unfair advantage for brands. Its EdgeAI engine is trained on decades of exclusive social and influencer data to build strategies that drive measurable growth. The platform connects brands to the right creators, content and channels using proprietary data and AI predictions and designs campaigns for every outcome—from engagement to sales. By turning influencer marketing into predictable revenue and making it as repeatable and measurable as other media investments, Later uses AI and human expertise to deliver full-funnel results.",
    "social_results": "Later's platform drives significant reach and engagement. For example, a case study notes that the company helped fast casual chain El Pollo Loco launch a creator campaign that generated over 46 million impressions. Customer testimonials highlight deep influencer networks and campaigns that deliver long-term performance.",
    "marketing_strategy": "Later leverages its AI positioning and enterprise client roster to market the platform. It promotes EdgeAI's predictive capabilities, emphasising that brands can achieve predictable revenue and safe partnerships, and showcases case studies and client testimonials from brands such as El Pollo Loco and Tom's of Maine to illustrate success.",
    "technology_offering": "A full-service influencer marketing software platform.",
    "technology_functions": "EdgeAI uses historical social data to predict outcomes; proprietary data and AI predictions identify the right creators, content and channels; the platform manages campaign creation, activation, optimisation and measurement; and it includes analytics and reporting to make influencer marketing as repeatable and measurable as other media investments.",
    "integrations": "Official marketing partner with Pinterest and TikTok; integrates with e-commerce and affiliate platforms such as Rakuten and supports social media scheduling, social listening, link-in-bio and creator enrollment tools as part of the wider Later suite.",
    "other_info": "Later acquired influencer marketing pioneer Mavrck in 2022, rebranding the combined platform as Later Influence. The company's EdgeAI engine is trained on decades of social data and is positioned as a leader in predictive influencer marketing.",
    "Monthly traffic av 3 month": "1,766,660"
  },
  {
    "name": "Skeepers",
    "website": "https://skeepers.io/en/influencer-marketing",
    "type": "Platform",
    "Unified Type": "Platform",
    "business_model": "Subscription-based SaaS platform with modular pricing depending on selected solutions.",
    "pricing": "Pricing is not publicly disclosed and is customised based on the number of creators and modules used.",
    "offer_usp": "Offers a suite of software for collecting consumer-generated content, including ratings and reviews, live shopping experiences, consumer videos, and influencer marketing campaigns, with a focus on nano and micro-influencers.",
    "sales_points": "Specializes in activating nano and micro-influencers. Provides an integrated suite of tools for various forms of consumer engagement, not just influencer marketing. Helps brands collect authentic ratings, reviews, and video content.",
    "positioning": "A platform that combines various consumer engagement and user-generated content tools, emphasizing the power and authenticity of nano and micro-influencers.",
    "client_profile": "Brands looking to leverage nano and micro-influencers for authentic content and social proof.",
    "geographical_focus": "Global.",
    "social_media_links": "Instagram: https://www.instagram.com/skeepers; TikTok: https://www.tiktok.com/@skeepers; LinkedIn: https://www.linkedin.com/company/skeepers; Facebook: https://www.facebook.com/skeepers",
    "content_strategy_analysis": "Skeepers’ influencer marketing solution uses AI to match brands with micro and nano influencers and automates gifting campaigns to generate authentic, royalty‑free content and product reviews. The platform emphasises smart matching, easy campaign execution and real‑time analytics so brands can scale across channels like TikTok, Instagram and YouTube. It forms part of Skeepers’ wider user‑generated content suite, which also includes verified reviews, feedback management and brand communities.",
    "social_results": "According to Skeepers, brands using its influencer marketing module have seen a 58 % increase in brand visibility, 85 % of products sent resulting in posts, and more than 300 million social media engagements. The company reports that over 8,000 companies trust its suite of solutions.",
    "marketing_strategy": "Skeepers markets its influencer solution by highlighting the efficiency of gifting campaigns and the authenticity of micro and nano influencers. It positions its platform as an end‑to‑end solution that delivers measurable visibility, content creation and social engagement while integrating seamlessly with its broader user‑generated content tools.",
    "technology_offering": "AI‑powered influencer marketing module within the Skeepers consumer engagement suite.",
    "technology_functions": "Smart matching to connect brands with micro and nano influencers, automated campaign execution and logistics, gifting management, and real‑time analytics and reporting.",
    "integrations": "Supports campaigns on TikTok Shop, Instagram Shopping and YouTube and works alongside Skeepers modules for verified reviews, feedback management and brand communities.",
    "other_info": "Skeepers originated from the influencer platform Octoly and is headquartered in France.",
    "Monthly traffic av 3 month": "1,733,330"
  },
  {
    "name": "Heepsy",
    "website": "https://www.heepsy.com/",
    "type": "Platform (Search Engine)",
    "Unified Type": "Platform",
    "business_model": "Tiered subscription model with a free plan.",
    "pricing": "Offers a Free plan. Paid plans include Starter (starts at €69/month), Plus (starts at €199/month), and Advanced (starts at €299/month). Discounts are available for longer-term subscriptions.",
    "offer_usp": "A global influencer search engine and all-in-one marketing platform for finding and managing influencers based on demographics, niche, location, and platform.",
    "sales_points": "Database contains over three million influencers with more than 5,000 followers. Provides advanced search filters for category, location, engagement, and audience metrics. Uses AI to analyze creator authenticity and provides detailed profile insights. Offers bulk outreach capabilities and campaign management tools. Provides free tools like Fake Follower Checkers.",
    "positioning": "A powerful search engine and influencer marketing platform designed to help brands discover, analyze, and manage influencers globally.",
    "client_profile": "Brands and marketers of various sizes. Notable clients include Phillips, StubHub, and HAWKERS.",
    "geographical_focus": "Global. Headquartered in Bilbao, Spain.",
    "social_media_links": "Not provided in context.",
    "content_strategy_analysis": "Not provided in context.",
    "social_results": "Not provided in context.",
    "marketing_strategy": "Marketing strategy includes offering a free plan and a wide range of free tools (e.g., ROI calculator, fake follower checkers) to attract users. It also leverages its investors, Google for Startups and MassChallenge, for credibility.",
    "technology_offering": "An AI-powered influencer search engine and marketing platform.",
    "technology_functions": "Advanced influencer search, audience and performance analytics, authenticity analysis, influencer relationship management (IRM) via lists, individual and bulk outreach, campaign offer pages, reporting, and media monitoring.",
    "integrations": "Integrates with Shopify. The 'Advanced' plan mentions 'Multiple E-commerce integrations.'",
    "other_info": "Founded in 2016. Investors include Google for Startups and MassChallenge. Rated 4.5/5 on G2.",
    "Monthly traffic av 3 month": "215,165"
  },
  {
    "name": "CreatorIQ",
    "website": "https://creatoriq.com/",
    "type": "Platform",
    "Unified Type": "Platform",
    "business_model": "Enterprise-grade SaaS platform with a custom subscription model.",
    "pricing": "Operates on a custom enterprise pricing model; no public tiers. Annual platform licenses are estimated to be between $30,000 and $90,000+, with an annual commitment required. The 'CreatorIQ Convert' affiliate product is based on a pay-for-results model.",
    "offer_usp": "An AI-native operating system for creator-led growth, designed for large enterprises to manage global influencer and affiliate programs at scale.",
    "sales_points": "Built on 'The Creator Graph,' a proprietary AI infrastructure processing 123M+ posts daily. Features 'SafeIQ,' an enterprise-grade, AI-native brand safety solution. Trusted by over 1,300 global brands including Google, Nestlé, Disney, and Unilever. Offers deep integrations with major affiliate networks, e-commerce platforms, and CRMs. Recognized as an IDC MarketScape Leader and on the Deloitte Technology Fast 500™ for four consecutive years. ISO/IEC 27001:2022 certified.",
    "positioning": "An advanced, enterprise-level platform for large organizations to unify, execute, and measure global influencer and affiliate marketing initiatives with a focus on data, safety, and ROI.",
    "client_profile": "Large enterprises with annual influencer marketing budgets exceeding $1 million. Clients include Google, Nestlé, Disney, Unilever, LVMH, Sephora, and Delta Air Lines.",
    "geographical_focus": "Global.",
    "social_media_links": "Supports campaigns on Instagram, YouTube, TikTok, Facebook, and Pinterest.",
    "content_strategy_analysis": "Not provided in context.",
    "social_results": "In 2025, customers saw a 79% increase in direct creator payments and an 84% increase in affiliate revenue tracked through the platform.",
    "marketing_strategy": "Marketing focuses on its enterprise-grade positioning, highlighting its advanced AI, security certifications (ISO, SOC2), major client logos, and industry awards (Deloitte, IDC) to attract large organizations.",
    "technology_offering": "An AI-native platform built on 'The Creator Graph.' Key products include the core platform, 'SafeIQ' for brand safety, and 'CreatorIQ Convert' for affiliate marketing.",
    "technology_functions": "AI-powered discovery, influencer CRM, unified program management, workflow automation, content approvals (via DocuSign), global creator payments (CreatorIQ Pay), creator affiliate marketing, competitive benchmarking, and social listening.",
    "integrations": "Extensive integrations. API: ExchangeIQ for BI tools/CRMs (Salesforce). E-commerce: Shopify. Payments: Stripe, PayPal. Analytics: Google Analytics, LiveRamp. Affiliate Networks: Awin, Impact, Rakuten, CJ, Partnerize, ShareASale. Social Platforms: Deep integrations with Meta, Snapchat, TikTok, YouTube.",
    "other_info": "Founded in 2014. Has raised $80.8 million in funding. ISO/IEC 27001:2022 certified and GDPR/CCPA compliant.",
    "Monthly traffic av 3 month": "191,000"
  },
  {
    "name": "Collabstr",
    "website": "https://collabstr.com/",
    "type": "Platform (Marketplace)",
    "Unified Type": "Platform",
    "business_model": "A marketplace with a tiered subscription model for brands that reduces transaction fees. Creators join for free and pay a 15% transaction fee on earnings.",
    "pricing": "For Brands: Basic Plan ($0/month + 10% marketplace fee), Pro Plan ($149/mo yearly), and Premium Plan ($199/mo yearly + 5% marketplace fee). A 'Full Service' agency option is also available.",
    "offer_usp": "A user-friendly online marketplace that democratizes influencer marketing with simplicity, affordability, and speed, offering a pay-per-project model and a secure escrow payment system.",
    "sales_points": "Free to join for brands with a pay-per-project model. Features a network of over 350,000 vetted influencers. Provides a secure escrow payment system, releasing funds only after work is approved. Enables direct communication and negotiation between brands and creators. Offers a UGC-specific marketplace. No long-term contracts required.",
    "positioning": "A user-friendly and affordable marketplace designed to simplify and streamline influencer marketing for small to medium-sized businesses and creators.",
    "client_profile": "Small to medium-sized businesses (SMBs), startups, and creators. Used by 80,000 registered brands. Notable clients include Wealthsimple and Numi.",
    "geographical_focus": "Global, available in over 35 countries.",
    "social_media_links": "Active on Instagram, TikTok, and Twitter. Supports campaigns on Instagram, TikTok, YouTube, Twitch, and Twitter.",
    "content_strategy_analysis": "Not provided in context.",
    "social_results": "A campaign for Numi generated 50,000+ impressions.",
    "marketing_strategy": "Marketing strategy includes offering a suite of free tools (Influencer Price Calculator, Fake Follower Checkers, Engagement Rate Calculators) to attract users. It also maintains a blog, a resource hub, and an affiliate program.",
    "technology_offering": "An online marketplace platform with tools for discovery, communication, and payment.",
    "technology_functions": "Influencer search, campaign posting (brands receive applications), instant messaging, analytics tracking, campaign brief templates, contract templates, and a secure escrow payment system.",
    "integrations": "Uses Stripe for brand payments (credit/debit cards) and Dots for creator payouts (PayPal, CashApp, Venmo).",
    "other_info": "Collabstr is explicitly not an agency. The platform has mobile apps for iOS and Android. A noted limitation is the lack of advanced targeting and minimal campaign strategy consulting.",
    "Monthly traffic av 3 month": "569,865"
  },
  {
    "name": "Greenhouse Communications",
    "website": "https://greenhouse.agency/",
    "type": "Agency",
    "Unified Type": "Agency",
    "business_model": "Service-based model, typical for a PR and communications agency.",
    "pricing": "Not publicly stated. Third-party estimates suggest a range from $6,000 to $70,000 annually, depending on scope.",
    "offer_usp": "A specialist environmental communications agency dedicated to driving positive social and environmental impact for clients accelerating the transition to a net-zero economy.",
    "sales_points": "Fully employee-owned company with over 20 years of experience. Certified B Corporation with a high B Impact Score (121.8) and ISO14001 certified. Deep expertise in high-impact sustainability sectors (Energy, Food, Transport, Nature). Offers fully integrated communications services, from research to paid media. Winner of Business Green's 'Communications Agency of the Year' multiple times. Adheres to an ethical AI Manifesto.",
    "positioning": "A specialist 'green PR and digital agency' for 'game changers' who are creating a more sustainable world. It positions itself as a partner in driving real impact and systemic change.",
    "client_profile": "Mission-driven organizations, including businesses, entrepreneurs, and NGOs focused on sustainability and the low-carbon economy. Clients include NatPower, Surfers Against Sewage, Greenpeace, Bloomberg Ocean Initiative, and The Nature Conservancy.",
    "geographical_focus": "Global. Headquartered in the UK (Bristol, London, Dorset) but works with clients and executes campaigns worldwide.",
    "social_media_links": "Threads: https://www.threads.net/@greenhousecomms, LinkedIn: https://uk.linkedin.com/company/greenhouse-pr/, Instagram: https://www.instagram.com/greenhousecomms/, Bluesky: https://bsky.app/profile/greenhouse.agency",
    "content_strategy_analysis": "LinkedIn content is focused on company updates, industry insights related to sustainability, showcasing impactful case studies, awards, and thought leadership pieces on topics like COP30 communications.",
    "social_results": "LinkedIn profile has 12,742 followers. A campaign for The Nature Conservancy generated over 1.1 billion impressions. A campaign for Surfers Against Sewage secured 200 media placements.",
    "marketing_strategy": "Marketing is driven by thought leadership (blog posts, reports), PR around its awards and B Corp status, and detailed case studies that highlight massive media reach and impact for its clients.",
    "technology_offering": "The agency invests in insights, creative, and paid media tools, guided by an ethical AI Manifesto that ensures human oversight and expert training.",
    "technology_functions": "Services include insights and research, strategy and messaging, creative and content production (film, animation, reports), and activation campaigns (digital advertising, social media, media relations, key opinion leader engagement).",
    "integrations": "No specific software integrations are mentioned.",
    "other_info": "Founded in 2003/2004 by Anna Guyer. It is a fully employee-owned company. The website experienced 404 errors on key pages during research attempts.",
    "Monthly traffic av 3 month": "9,300"
  },
  {
    "name": "Takumi",
    "website": "https://takumi.com/",
    "type": "Mix (Agency & Platform)",
    "Unified Type": "Mix (Agency & Platform)",
    "business_model": "A fully managed service agency powered by a proprietary platform. Operates on a fee-per-service model for campaigns with no monthly subscription.",
    "pricing": "Pricing is provided on request and is based on individual campaign needs and budget. No public minimums were found.",
    "offer_usp": "A global leader in influencer and creator marketing that delivers a fully managed service, combining human creativity with a data-driven, award-winning technology platform for unmatched performance.",
    "sales_points": "Over 8 years of experience with thousands of campaigns for 1,000+ global brands. Employs a rigorous, multi-step vetting process, accepting only 7% of creator applicants. Brands receive ownership of the content for future marketing use. Claims campaigns are 7 times more effective than Google Display ads. Acquired Unieed to enhance paid media capabilities. Raised $14.3M in funding.",
    "positioning": "Positions itself as the 'World's Leading Data-driven Influencer Marketing Platform' and a pioneer in leveraging micro-influencers to deliver creativity and real ROI.",
    "client_profile": "Large brands and advertising agencies, but also suitable for small and medium brands. The client list includes Sony Music, Hilton, Procter & Gamble, BBC, La Roche-Posay, Uber, and Mercedes-Benz.",
    "geographical_focus": "Global, with offices in London, UK, and New York, USA. Services are available in the USA, UK, Ireland, Iceland, and Germany.",
    "social_media_links": "TikTok: https://www.tiktok.com/@takumihq, Facebook: https://www.facebook.com/takumihq/, Instagram: https://www.instagram.com/takumihq/, LinkedIn: https://www.linkedin.com/company/takumihq",
    "content_strategy_analysis": "Social media content is used to promote services, share case studies, and provide thought leadership on influencer marketing trends. LinkedIn posts often highlight the team and company culture.",
    "social_results": "Not provided in context.",
    "marketing_strategy": "Marketing relies on showcasing case studies, publishing industry insights, and promoting its data-driven approach. The acquisition of Unieed is also a key marketing point for its paid media services.",
    "technology_offering": "A proprietary influencer marketing platform with a dedicated mobile app for creators and a dashboard for brands/agencies.",
    "technology_functions": "Influencer discovery and vetting ('TAKUMI creator index'), background checks, briefing, contracting, content submissions/approvals, payments, campaign tracking, real-time reporting, and brand lift studies.",
    "integrations": "The platform allows for creator-driven amplification and paid social advertising, but specific third-party integrations are not listed. Uses HubSpot Marketing Hub.",
    "other_info": "Founded in 2014. Acquired Unieed (Aug 2021) and Qibitech (Sep 2020). Content licensing provides brands a one-year, royalty-free, non-exclusive license for digital use unless otherwise negotiated.",
    "Monthly traffic av 3 month": "4,865"
  },
  {
    "name": "Obviously",
    "website": "https://www.obvious.ly/",
    "type": "Agency",
    "Unified Type": "Agency",
    "business_model": "A full-service global influencer marketing agency, likely operating on retainers or project fees.",
    "pricing": "Pricing details are not public; interested parties are directed to 'Get in touch.'",
    "offer_usp": "A full-service global influencer marketing agency and a VML company that develops authentic, custom influencer communities and provides dynamic content at incredible scale for iconic brands.",
    "sales_points": "Part of the WPP network via VML, providing significant resources and reach. Offers end-to-end services including in-house logistics for custom product seeding. Specializes in content licensing and repurposing IGC for e-commerce PDPs. Provides sophisticated and flexible content rights options (licensing vs. work-for-hire). Utilizes proprietary AI and an interactive client dashboard for advanced analytics. Official TikTok and Meta Partner.",
    "positioning": "A leading full-service global influencer marketing agency and creative content engine that delivers 'Creator-Driven Commerce' solutions for Fortune 500 clients.",
    "client_profile": "Fortune 500 clients and iconic brands across numerous verticals, including Automotive, B2B, Beauty, Entertainment, and Retail. Key clients include Google, Sherwin Williams, Microsoft, Square, Amazon, and large beauty groups like Estée Lauder and L'Oréal.",
    "geographical_focus": "Global. The agency has a global team and can execute campaigns in any language, with offices in New York (HQ), San Francisco, Los Angeles, and Paris.",
    "social_media_links": "LinkedIn, Instagram, and Facebook.",
    "content_strategy_analysis": "Not provided in context.",
    "social_results": "Reports over 5.1 billion organic impressions and 152,000+ influencer collaborations. Claims an average of $5.20 ROI for every $1 spent.",
    "marketing_strategy": "Marketing leverages its position within the WPP network, its official partner status with TikTok and Meta, and impressive aggregate performance metrics to attract large clients. Case studies and awards are also key components.",
    "technology_offering": "Leverages a proprietary AI-powered platform with an interactive client dashboard ('Studio Dashboard') for analytics and reporting.",
    "technology_functions": "Advanced data analytics, real-time reporting, 'always-on brand safety checks,' and a competitive analysis tool called 'Share of Influence.' The platform also supports the management of custom creator networks.",
    "integrations": "Official TikTok and Meta Partner, indicating deep platform integration.",
    "other_info": "Acquired by VMLY&R, now a VML company within the WPP network. Founded in 2014 by Mae Karwowski and Maxime Domain. Named 'Influencer Marketing Agency of the Year 2024' in France. Its services agreement includes forward-thinking clauses on using public content for AI modeling.",
    "Monthly traffic av 3 month": "232,235"
  },
  {
    "name": "Avenue Z (formerly The Snow Agency)",
    "website": "https://avenuez.com/",
    "type": "Agency",
    "Unified Type": "Agency",
    "business_model": "A full-service strategic communications and marketing advisory, likely operating on retainers or project fees.",
    "pricing": "Not publicly disclosed.",
    "offer_usp": "A full-service strategic communications and marketing advisory that employs a 'Convergence Media' approach, integrating PR, marketing, and media to turn brand perception into performance.",
    "sales_points": "Executes a rapid growth strategy through acquisitions of specialized firms (The Snow Agency, Designzillas, Bevel). Backed by private equity fund Baleon Capital. Offers a comprehensive suite of services including PR, AI optimization, paid media, and performance marketing. Utilizes an Influencer Network Platform and AI-powered creator discovery. Proven results for DTC brands, such as increasing revenue by 537% for Yogibo.",
    "positioning": "A next-generation advisory firm that turns brand perception into performance by leading in AI optimization and driving influence across all channels.",
    "client_profile": "Direct-to-consumer (DTC) brands and companies in sectors like alternative assets. Case studies feature clients like Yogibo, Nightwise, Nori, and Saranghae.",
    "geographical_focus": "Primarily US-focused with offices in New York and Miami.",
    "social_media_links": "Active on YouTube, X (formerly Twitter), Instagram, TikTok, and LinkedIn.",
    "content_strategy_analysis": "Not provided in context.",
    "social_results": "The former Snow Agency drove over $1 billion in revenue for over 200 DTC brands.",
    "marketing_strategy": "Marketing is driven by PR around its series of acquisitions and rebrand, showcasing its rapid growth and expanding capabilities. Case studies with strong revenue-based outcomes are a key tool.",
    "technology_offering": "Utilizes an Influencer Network Platform and leverages AI for creator discovery, optimization, and email/SMS marketing.",
    "technology_functions": "Influencer discovery, influencer relationship management, campaign management, performance analysis (tracking engagement, conversions, ROI), and AI-powered marketing automation.",
    "integrations": "Shopify Plus Partner, Google, Meta, TikTok, Klaviyo, and Attentive.",
    "other_info": "Avenue Z is the new brand identity for a network of acquired agencies, including The Snow Agency (acquired June 2023). The company is led by Chairman and CEO Jeffrey Herzog and funded by Herzog and Baleon Capital.",
    "Monthly traffic av 3 month": "31,000"
  },
  {
    "name": "Strudel",
    "website": "https://streamstrudel.com/",
    "type": "Agency",
    "Unified Type": "Agency",
    "business_model": "A service-based agency model, working directly with clients on campaigns.",
    "pricing": "No public information on pricing or plans, indicating a bespoke, quote-based approach.",
    "offer_usp": "A specialized global influencer marketing agency that connects brands with audiences through data-driven, creative campaigns exclusively on TikTok.",
    "sales_points": "Deep specialization in the TikTok ecosystem. Tracks the top 100,000 TikTok creators daily via a proprietary database. High-profile client portfolio including SONY, Warner, Universal, Amazon, ByteDance, and Gucci. Proven results, generating 8.6 billion video views and achieving a 70% lower CPM for clients. Strong focus on social commerce, with over 4,000 shoppable videos per month and a network of 400+ live hosts.",
    "positioning": "A Global Influencer Marketing Agency with a primary focus on connecting brands with audiences through TikTok, leveraging data and Gen-Z creative expertise.",
    "client_profile": "Major music labels (SONY, Warner, Universal) and global brands (Amazon, ByteDance, Gucci, Bondi Sands) looking for expert TikTok campaign execution.",
    "geographical_focus": "Global. Headquartered in London, England.",
    "social_media_links": "Instagram: @streamstrudel, LinkedIn: Strudel company page",
    "content_strategy_analysis": "Instagram bio highlights its agency status and top-tier clients. LinkedIn describes itself as an advertising service focused on TikTok.",
    "social_results": "Instagram: 2,469 followers. LinkedIn: 908 followers. A campaign for Mimi Webb resulted in 280,000 videos created and 121 million content views.",
    "marketing_strategy": "Marketing relies on showcasing impressive performance metrics and case studies with major brands and music artists to demonstrate its deep TikTok expertise.",
    "technology_offering": "Utilizes a proprietary database that tracks the top 100,000 TikTok creators daily, allowing for detailed performance analysis and segmentation.",
    "technology_functions": "Geographic segmentation, performance metric analysis for any creator, song, or hashtag, and real-time, automated campaign reporting.",
    "integrations": "No specific integrations mentioned, but its focus on TikTok implies deep platform knowledge.",
    "other_info": "Founded in 2019. Reported Net Assets of £408.59K as of Dec 31, 2024. The company is actively hiring for TikTok Shop-related roles, indicating a strong focus on social commerce.",
    "Monthly traffic av 3 month": "210"
  },
  {
    "name": "Ed Hopkins PR",
    "website": "https://edhopkinspr.co.uk/",
    "type": "Agency",
    "Unified Type": "Agency",
    "business_model": "A boutique public relations agency operating on a service-based model.",
    "pricing": "No public rate card is available.",
    "offer_usp": "An award-winning boutique public relations agency providing strategic communications, reputation management, and influencer seeding for both individual talent and brands.",
    "sales_points": "Award-winning boutique agency established in 2015. Offers specialized PR services for both personal talent (actors, musicians) and brands. Provides 'Influencer & Talent Seeding' as a specific service. Manages reputation, profile building, media relations, and crisis navigation.",
    "positioning": "A boutique public relations agency specializing in strategic communications for talent and brands.",
    "client_profile": "Individual talent (actors, musicians, public figures) and brands seeking PR, communications, and influencer seeding services.",
    "geographical_focus": "Based in the UK (London/Hampshire), but likely serves clients with international needs.",
    "social_media_links": "LinkedIn: uk.linkedin.com/company/ed-hopkins-pr, Instagram: @edhopkinspr, Facebook: facebook.com/edhopkinspr, Twitter/X: @edhopkinspr",
    "content_strategy_analysis": "Not provided in context.",
    "social_results": "Instagram: 11,000 followers, 200 posts. Facebook: 551 likes. LinkedIn: Lists 4 employees.",
    "marketing_strategy": "Marketing appears to be driven by the personal brand of its founder, Edward Hopkins, and its social media presence.",
    "technology_offering": "No proprietary technology is mentioned.",
    "technology_functions": "Not applicable.",
    "integrations": "No specific integrations are mentioned.",
    "other_info": "Operates under the legal trading name of Cooper & Hopkins Limited. Several key pages on the official website were returning 404 errors during research, suggesting potential website issues.",
    "Monthly traffic av 3 month": "4,700"
  },
  {
    "name": "TikMarketing",
    "website": "https://tikmarketing.co.uk/",
    "type": "Agency",
    "Unified Type": "Agency",
    "business_model": "A specialized, service-based agency model focused on TikTok Shop.",
    "pricing": "No public rate card is available. The contact form requires prospective clients to state their annual turnover, suggesting a qualification process or tailored pricing.",
    "offer_usp": "The 'Official #1 TikTok Shop Agency' and an award-winning TikTok Shop Partner that helps brands scale their business and achieve up to a 30x increase in revenue on the platform.",
    "sales_points": "Official TikTok Shop Partner. Awarded 'LIVE Badge,' 'Video Badge,' and 'Affiliate Badge' by TikTok for top performance. Winner of the 'CAP Badge: Short Video – Gold Level Badge' and the '0-1: Grow Together Award.' Manages a large network of affiliates who post over 600 videos daily for clients. Claims to achieve 6+ ROAS on TikTok ads. Offers full shop management, from onboarding to ads and livestreams.",
    "positioning": "Positions itself as the leading, award-winning agency exclusively focused on driving revenue and growth for brands on TikTok Shop.",
    "client_profile": "Brands of various sizes seeking to scale their business on TikTok Shop.",
    "geographical_focus": "Based in the UK (Crawley).",
    "social_media_links": "LinkedIn: @tikmarketinguk, Instagram: @tikmarketinguk, TikTok: @tikmarketinguk",
    "content_strategy_analysis": "Not provided in context.",
    "social_results": "Claims to drive over $3,000,000 in monthly revenue on TikTok for one of its largest clients and helps brands achieve six-figure revenues in under three months.",
    "marketing_strategy": "Marketing is heavily reliant on its official TikTok partner status and numerous awards from the platform. It uses strong performance claims and case results to attract clients.",
    "technology_offering": "No proprietary technology is mentioned; the agency focuses on expert, service-based execution on the TikTok platform.",
    "technology_functions": "Not applicable.",
    "integrations": "As an official TikTok Shop Partner, the agency has deep integration and expertise with the TikTok platform's affiliate, live, video, and ad systems.",
    "other_info": "The agency notes the standard TikTok Shop commission fees (1.8% for the first 90 days, then 5%) for transparency with clients.",
    "Monthly traffic av 3 month": "7,100"
  },
  {
    "name": "Collectively",
    "website": "https://www.collectivelyinc.com/",
    "type": "Agency",
    "Unified Type": "Agency",
    "business_model": "A full-service global influencer marketing agency, likely operating on retainers or project fees.",
    "pricing": "Not publicly disclosed.",
    "offer_usp": "A global, people-powered marketing agency that combines strategy, creative, and technology to solve key industry challenges like ROI demonstration and fraud-free metrics at a global scale.",
    "sales_points": "Acquired by The Brandtech Group and merged with TheAmplify, creating a larger, more powerful entity. Led by an all-women executive team. Has a mandate to present at least 40% influencers of color for all programs. Works with a wide range of global and independent brands. Actively collaborating with Gen AI artists and creators. Winner of two gold awards at the 2025 Global Influencer Marketing Awards.",
    "positioning": "A leader in people-powered marketing, focused on developing authentic influencer campaigns that are data-driven, fraud-free, and globally scalable.",
    "client_profile": "A range of brands from global names to independent companies across consumer lifestyle categories like Fashion, Retail, Beauty, Home, Tech, and Wellness. Key clients include Adobe, Coty, Danone, Diageo, HP, LinkedIn, NFL, and Unilever.",
    "geographical_focus": "Global.",
    "social_media_links": "Active on Instagram, LinkedIn, and TikTok.",
    "content_strategy_analysis": "Not provided in context.",
    "social_results": "Not provided in context.",
    "marketing_strategy": "Marketing leverages its acquisition by The Brandtech Group, its numerous awards, and its commitment to diversity and inclusion. Case studies with major brands are also a key component.",
    "technology_offering": "The agency utilizes technology for data-driven strategy and full-funnel reporting, but no specific proprietary platform name is mentioned.",
    "technology_functions": "Data-driven strategy, influencer matchmaking, and full-funnel reporting.",
    "integrations": "Not provided in context.",
    "other_info": "Founded in 2013. Acquired by You & Mr Jones (now The Brandtech Group) in August 2020 and merged with TheAmplify. Named one of the world's Most Innovative Companies by Fast Company in 2018. Creator compensation is project-based with standard payment terms of net 60 via PayPal.",
    "Monthly traffic av 3 month": "11,265"
  },
  {
    "name": "Underscore Talent",
    "website": "https://underscoretalent.com/",
    "type": "Talent Management Company",
    "Unified Type": "Talent Management Company",
    "business_model": "A 360° talent management model focused on building long-lasting careers for creators, primarily through a licensing model. Also generates ancillary revenue from consumer products, e-commerce, publishing, and production.",
    "pricing": "Operates on a commission-based model typical for talent management.",
    "offer_usp": "A next-generation management company that provides personalized, scalable 360° management for digital-first talent, with a majority stake owned by media powerhouse TheSoul Publishing.",
    "sales_points": "Founded by industry veterans from Studio71 and The Collective. Acquired a majority stake by TheSoul Publishing, providing significant resources. Amassed $120 million in branded content deals and executed 5,000 campaigns in 2024. Represents high-profile talent like Noah Beck. Launched a dedicated comedy division and a web3 IP studio (Underscore LABS). Has an in-house digital production arm, Shorthand Studios.",
    "positioning": "A next-generation management company for the 'attention economy,' focused on building long-lasting, multi-platform careers for creators, personalities, artists, and entrepreneurs.",
    "client_profile": "A diverse range of digital-first talent, including creators on YouTube, TikTok, Instagram, and Twitch, as well as gamers, podcasters, and public personalities. Marquee talent includes Noah Beck, Fysh Foods founder Zoya Biglary, and comedy creators like Zachariah Porter.",
    "geographical_focus": "Based in Beverly Hills, CA, serving a primarily US-based but globally recognized roster of talent.",
    "social_media_links": "LinkedIn (approx. 5,739 followers), Instagram (@underscoretlnt), Twitter, and Facebook.",
    "content_strategy_analysis": "Not provided in context.",
    "social_results": "Represents talent featured on the Forbes 30 Under 30 list. Executed a major 360° creator amplification model for the Las Vegas Grand Prix.",
    "marketing_strategy": "Marketing is driven by PR around its major brand collaborations (F1, Red Bull, Guess), high-profile talent signings, strategic partnerships (TheSoul Publishing), and expansion into new verticals like comedy and web3.",
    "technology_offering": "Launched Underscore LABS, a web3 IP studio to explore the intersection of media, entertainment, and community.",
    "technology_functions": "The company's focus is on management services, but its LABS division explores web3 technologies for talent.",
    "integrations": "Not applicable.",
    "other_info": "Founded in 2021. In December 2022, TheSoul Publishing acquired a majority stake in the company. The company has a charitable partnership with The Salvation Army.",
    "Monthly traffic av 3 month": "6,735"
  },
  {
    "name": "Shine Talent Group",
    "website": "https://shinetalentgroup.com/",
    "type": "Mix (Talent Management Company & Agency)",
    "Unified Type": "Mix (Agency, Talent Management Companie)",
    "business_model": "A dual model serving both brands with influencer relations/campaign services and creators with one-on-one talent management. Also operates an angel investment firm (LOVEXMONEY) for its talent.",
    "pricing": "Not publicly disclosed.",
    "offer_usp": "A global talent management and influencer relations agency that provides 360-degree support for creators, including an in-house angel investment firm to help them launch their own businesses.",
    "sales_points": "Global footprint with offices in Los Angeles, Toronto, London, and a planned NY office. Manages over 3,000 campaigns quarterly with a network of 300+ creators. Operates LOVEXMONEY, an angel investment firm to fund talent's business ideas. Has an in-house literary agent to support creators in writing books. Provides comprehensive back-office support, including contract specialists and a full finance department. Has grown through strategic acquisitions (Spark Talent Group, Fourth Floor Creative).",
    "positioning": "A global talent management and influencer relations agency specializing in the online and social space, focused on fostering creator growth through brand partnerships and ancillary revenue streams.",
    "client_profile": "Represents a global roster of micro to macro social talent, with a primary focus on beauty, fashion, and lifestyle niches. Also serves brands and agencies with campaign services. Brand partners include Walmart, Canadian Tire, Ulta Beauty, Merit Beauty, and Knix.",
    "geographical_focus": "Global, with offices in Los Angeles (US), Toronto (Canada), and London (UK).",
    "social_media_links": "Instagram: @shinetalentgroup (approx. 29,399 followers), TikTok: @shinetalentgroup, LinkedIn: (approx. 5,426 followers), Facebook: (approx. 3,271 likes).",
    "content_strategy_analysis": "Social media showcases high-profile brand collaborations with their talent, such as @fraicheliving x Walmart and @gillianxgrace x Ulta Beauty, to attract both new talent and brand partners.",
    "social_results": "Manages a network of 300+ creators and works with 2,000+ agency and brand partners.",
    "marketing_strategy": "Marketing is driven by showcasing successful, high-visibility brand partnerships, PR around its office expansions and acquisitions, and promoting its unique LOVEXMONEY investment arm for creators.",
    "technology_offering": "No proprietary technology platform is mentioned; the focus is on high-touch management and services.",
    "technology_functions": "Not applicable.",
    "integrations": "Not applicable.",
    "other_info": "The company's origins trace back to Shine PR (2015), with the influencer division launching in late 2015 and rebranding to Shine Talent Group in 2021. Founded by Jess Hunichen and Emily Ward.",
    "Monthly traffic av 3 month": "3,765"
  },
  {
    "name": "Digital Brand Architects (DBA)",
    "website": "https://thedigitalbrandarchitects.com/",
    "type": "Talent Management Company",
    "Unified Type": "Talent Management Company",
    "business_model": "A comprehensive talent management model focused on managing creators as individual business entities. Generates ancillary revenue through multiple divisions: Digital Brand Products (merchandise), Dear Media (podcast network), and a UGC division.",
    "pricing": "Operates on a commission-based model typical for talent management.",
    "offer_usp": "A pioneering digital influencer management company, now part of United Talent Agency (UTA), that represents a world-class portfolio of creators and has built a robust ecosystem for ancillary revenue generation.",
    "sales_points": "Acquired by United Talent Agency (UTA), providing talent with access to opportunities in traditional media (TV, film, publishing). Represents a roster of 180-350+ prominent influencers with a total reach of over 500 million. Operates Digital Brand Products (DBP) for talent-led merchandise and licensing. Founded Dear Media, a leading women-focused podcast network. Launched a dedicated UGC division in 2023. Has an in-house legal advisory team.",
    "positioning": "The industry's first digital influencer management company, representing a world-class portfolio of social media-oriented personalities, creators, and publishers.",
    "client_profile": "A world-class portfolio of prominent social media influencers, creators, and publishers, primarily in beauty, fashion, and lifestyle. Marquee talent includes Aimee Song, Patrick Starrr, Olivia Ponton, and Glamzilla.",
    "geographical_focus": "Bicoastal US presence with offices in New York City and Los Angeles.",
    "social_media_links": "Active on Instagram (@therealdba) and LinkedIn.",
    "content_strategy_analysis": "Not provided in context.",
    "social_results": "Facilitated major successes, including Patrick Starrr's beauty brand, One/Size, securing a $10 million investment.",
    "marketing_strategy": "Marketing is driven by the high-profile successes of its talent (e.g., major brand ambassadorships, product line launches), its affiliation with UTA, and features in top-tier publications like The New York Times and Forbes.",
    "technology_offering": "No proprietary technology platform is mentioned; the focus is on management and business development.",
    "technology_functions": "Not applicable.",
    "integrations": "Not applicable.",
    "other_info": "Founded in 2010 by Raina Penchansky. Acquired by United Talent Agency (UTA) in February 2019. Recognized as one of Ad Age’s Best Places to Work. Partners with the Create & Cultivate conference series.",
    "Monthly traffic av 3 month": "8,835"
  },
  {
    "name": "AWISEE",
    "website": "https://awisee.com/",
    "type": "Agency",
    "Unified Type": "Agency",
    "business_model": "A global digital marketing agency operating on a service-based model, with transparent pricing indicators.",
    "pricing": "Minimum project size is $5,000+. Hourly rates are between $50-$99. The most common project engagement is between $10,000 and $49,999.",
    "offer_usp": "A global digital marketing agency with strong specialization in executing KOL & Influencer Marketing campaigns in niche and complex sectors like Tech, SaaS, Fintech, Crypto, and iGaming.",
    "sales_points": "Offers a comprehensive, one-stop-shop service range, from influencer discovery to full campaign management. Possesses deep expertise in niche and complex industries (Crypto, Web3, AI, etc.). Manages campaigns globally across all major platforms, including localized campaigns for China (Douyin, Weibo) and Japan. Holds a very high reputation on Clutch (4.9/5 overall score) for quality, schedule, and cost.",
    "positioning": "A Global Digital Marketing Agency providing a full suite of services with a strong specialization in SEO, Digital PR, and KOL & Influencer Marketing for diverse and technical industries.",
    "client_profile": "Brands in Tech & SaaS, Fintech, E-commerce, Crypto, Web3, iGaming, Travel, and AI sectors.",
    "geographical_focus": "Global. A remote European agency with cited locations in Zürich (Switzerland), Singapore, and Stockholm (Sweden).",
    "social_media_links": "X (Twitter): @awisee_, LinkedIn: AWISEE company page.",
    "content_strategy_analysis": "LinkedIn highlights its specialties in Web3 and Crypto influencer marketing.",
    "social_results": "Not provided in context.",
    "marketing_strategy": "Marketing relies heavily on its strong reputation and high ratings on review platforms like Clutch. It also uses its website and social media to highlight its expertise in niche, high-growth sectors.",
    "technology_offering": "No proprietary technology is mentioned; the agency focuses on data-driven strategy and service-based execution.",
    "technology_functions": "Not applicable.",
    "integrations": "Not applicable.",
    "other_info": "Founded in 2018 by Gustav Andersson. The company is accessible via email, Telegram, and WhatsApp, indicating a flexible and modern communication approach.",
    "Monthly traffic av 3 month": "124,600"
  },
  {
    "name": "Trend",
    "website": "https://www.trend.io/",
    "type": "Platform (Marketplace)",
    "Unified Type": "Platform",
    "business_model": "A self-serve, pay-per-project User-Generated Content (UGC) marketplace using a 'Creator Credits' system. There are no monthly subscriptions or platform fees.",
    "pricing": "Operates on a credit-based system. The base cost is $9.16 per Creator Credit, with packages ranging from 'Starter' ($550 for 60 credits) to 'Scale' ($3,872 for 560 credits). Credits expire after 12 months.",
    "offer_usp": "A self-serve UGC marketplace that connects brands with a curated network of creators to produce authentic, high-quality, fully licensed photos and videos at scale with speed and cost-predictability.",
    "sales_points": "Pay-per-project model with no subscriptions or platform fees. Provides access to a curated network of over 3,700 vetted creators. Brands receive 100% licensing and distribution rights for all approved content in perpetuity. Guarantees content delivery, offering reimbursement if a creator fails to produce. Rapid content turnaround, with an average delivery time of 2-3 weeks. Streamlined, easy-to-use platform with automated project timelines.",
    "positioning": "A custom content studio for brands, focused on generating high-quality, licensed UGC for various marketing needs, rather than traditional influencer campaigns that require social posting.",
    "client_profile": "Brands of all sizes needing authentic photos and videos for marketing channels like social media, websites, paid ads, and Amazon product pages.",
    "geographical_focus": "Global.",
    "social_media_links": "Active on Instagram, LinkedIn, Facebook, Twitter, and TikTok.",
    "content_strategy_analysis": "Marketing emphasizes the creation of authentic content by real people in real settings.",
    "social_results": "The platform has facilitated over 20,000 completed partnerships, delivering 31,500+ videos and 46,000+ images.",
    "marketing_strategy": "Marketing highlights the platform's speed, cost-predictability, and the value of fully licensed UGC. The transparent, credit-based pricing is a key selling point.",
    "technology_offering": "A self-serve marketplace and content platform.",
    "technology_functions": "Project brief creation, creator application review and approval, content submission and approval workflow, automated project timelines, in-platform messaging, and creator payment handling.",
    "integrations": "No direct software integrations are mentioned. The content output is designed to be universally compatible with e-commerce platforms (like Shopify), social channels, and ad managers.",
    "other_info": "Trend recently joined forces with Soona, a virtual photo and video shoot platform. Creators on the platform are not required to have a minimum social follower count.",
    "Monthly traffic av 3 month": "99,765"
  },
  {
    "name": "Aspire",
    "website": "https://www.aspire.io/",
    "type": "Platform",
    "Unified Type": "Platform",
    "business_model": "SaaS platform with custom packages for brands, offering both DIY and managed agency services. The affiliate model is performance-based.",
    "pricing": "Pricing is not publicly disclosed; brands must contact sales for a custom quote. Third-party sources suggest pricing starts around $2,000-$2,500 per month with an annual commitment.",
    "offer_usp": "A leading influencer marketing software platform for high-growth e-commerce brands and Fortune 500 companies, designed to operationalize word-of-mouth commerce.",
    "sales_points": "Official TikTok Marketing Partner with direct API integration. Offers deep integrations with Shopify and WooCommerce for sales tracking and product seeding. Provides 'Attributable ROI,' measuring full-funnel metrics like sales, CAC, and LTV. Features a 'Creator Marketplace' for discovery and a 'Creator Academy' for education. SOC 2 Type 2 certified, ensuring high security and compliance standards. Manages payments and contracts through its 'AspirePay' feature.",
    "positioning": "An all-in-one platform for 'word-of-mouth commerce,' transforming creators into a scalable sales force for high-growth e-commerce brands and large enterprises.",
    "client_profile": "High-growth e-commerce brands and Fortune 500 companies, particularly in fashion, beauty, health, wellness, and consumer goods.",
    "geographical_focus": "Global.",
    "social_media_links": "Not provided in context.",
    "content_strategy_analysis": "Marketing resources include a blog, webinars, ebooks, marketing courses, and a community for founders called 'Inside Influence.'",
    "social_results": "Client case studies report a 2,100% increase in affiliate sales and achieving over 3x ROAS.",
    "marketing_strategy": "Marketing is driven by its official TikTok partnership, strong e-commerce integrations, and case studies demonstrating measurable ROI. It also fosters a community through educational content and events.",
    "technology_offering": "A comprehensive influencer marketing platform with a creator marketplace and strong analytics capabilities.",
    "technology_functions": "Creator discovery (search engine and marketplace), campaign and relationship management, content management and rights acquisition, sales generation (unique discount codes and affiliate links), and creator payments (AspirePay).",
    "integrations": "Deep integrations with Shopify, WooCommerce, Meta, TikTok, and Pinterest. Also integrates with affiliate networks like CJ, ShareASale, and Awin to centralize conversion data. Offers a REST API for custom workflows.",
    "other_info": "SOC 2 Type 2 certified, as well as GDPR and CCPA compliant. Aspire states that it never takes a commission from creators' earnings.",
    "Monthly traffic av 3 month": "165,835"
  },
  {
    "name": "AnyMind Group / AnyTag",
    "website": "https://anymindgroup.com/products/anytag/",
    "type": "Platform",
    "Unified Type": "Platform",
    "business_model": "A technology company offering a suite of platforms, including AnyTag for influencer marketing, likely on a subscription or enterprise license model.",
    "pricing": "Not publicly disclosed.",
    "offer_usp": "A leading technology company in Asia offering a comprehensive, end-to-end influencer marketing platform (AnyTag) specifically designed for the APAC region, with deep e-commerce and social commerce integrations.",
    "sales_points": "Significant presence in Asia with 25 offices across 15 markets. Certified TikTok Creator Solutions Partner. Holds numerous e-commerce partner certifications in Southeast Asia (TikTok Shop, Shopee, Lazada). Integrates its influencer platform (AnyTag) with its e-commerce management platform (AnyX) for unified commerce tracking. Acquired Vibula, a Vietnamese live commerce agency, to strengthen capabilities. Named 'Rising Star Partner of the Year 2024' by Shopify in Japan.",
    "positioning": "A leading technology company representing Asia, with a mission to make every business borderless through a suite of integrated platforms for marketing, e-commerce, and digital transformation.",
    "client_profile": "Marketers and businesses operating in the APAC region, from D2C brands to large enterprises.",
    "geographical_focus": "Primarily focused on the APAC region, with a strong presence in Singapore, Thailand, Indonesia, Vietnam, Japan, and the Philippines, as well as the Middle East.",
    "social_media_links": "Integrates with Instagram, TikTok, YouTube, X (Twitter), Facebook, Douyin, Threads, and XiaoHongShu.",
    "content_strategy_analysis": "Not provided in context.",
    "social_results": "Not provided in context.",
    "marketing_strategy": "Marketing is driven by its strong regional partnerships, official certifications from TikTok and major e-commerce marketplaces, and strategic acquisitions that bolster its market leadership in APAC.",
    "technology_offering": "Offers AnyTag, an influencer marketing platform, which is part of a broader suite including AnyX (e-commerce management), AnyFactory (manufacturing), and AnyAI (business intelligence). AnyTag now incorporates conversational AI for campaign planning and analysis.",
    "technology_functions": "Data-driven influencer discovery, end-to-end campaign management, performance tracking, hashtag and trend analytics, UGC tracking, and AI-powered content generation and recommendations.",
    "integrations": "AnyTag integrates with AnyX, which in turn connects to Shopify, TikTok Shop, Shopee, Lazada, and Qoo10. The overarching AnyAI platform integrates with over 40 global services including Facebook, TikTok, Amazon, and Google Ads.",
    "other_info": "Founded in Singapore in 2016. The company employs over 2,000 people. Its AnyCreator network supports influencers across the APAC region.",
    "Monthly traffic av 3 month": "147,365"
  },
  {
    "name": "Hypefy",
    "website": "https://hypefy.ai/",
    "type": "Mix (Platform & Agency)",
    "Unified Type": "Mix (Agency & Platform)",
    "business_model": "A disruptive, performance-based model with no subscription fees, retainers, or lock-ins. The platform is free to use; Hypefy earns a service fee (10-30%) of the campaign spend only when campaigns are launched and successful.",
    "pricing": "No monthly subscription fees. Brands set their campaign budget and only pay for the campaign spend plus a service fee (10-30%) upon launch.",
    "offer_usp": "An AI-powered influencer marketing platform that automates the entire campaign process and operates on a risk-free, performance-based model with no subscription fees.",
    "sales_points": "No subscription fees or long-term contracts ('no monthly ransom'). AI-powered automation for campaign generation, influencer discovery, outreach, and management, claiming 50% cost savings. Flexible system supports both full AI automation and manual control. Built-in bot detection, content vetting, and fraud protection. Supports campaigns globally. Secured clients like NIVEA and Philips and raised €1.75 million in seed funding.",
    "positioning": "An AI-powered influencer marketing platform that makes campaigns efficient, scalable, and risk-free through automation and a performance-based pricing model.",
    "client_profile": "Brands of all sizes looking for an efficient, cost-effective, and low-risk way to run influencer campaigns. Notable clients include NIVEA and Philips (Beiersdorf).",
    "geographical_focus": "Global, supporting campaigns across Europe, North America, South America, Australia, and Africa.",
    "social_media_links": "Active on LinkedIn (@Hypefy AI), Instagram (@hypefy.ai), TikTok (@hypefy.ai), Facebook (hypefyai), YouTube (@hypefy-ai), and X/Twitter (@HypefyOfficial).",
    "content_strategy_analysis": "Marketing message is centered on its risk-free, performance-based model and AI-driven efficiency.",
    "social_results": "Trusted by over 100 brands with a monthly reach of over 5 million.",
    "marketing_strategy": "Marketing is heavily focused on its unique performance-based pricing model, which it promotes as 'skin in the game.' It also offers free tools like an ROI calculator to attract users.",
    "technology_offering": "An AI-powered platform designed to automate the entire influencer marketing campaign lifecycle.",
    "technology_functions": "AI Campaign Builder, automated influencer outreach, centralized collaboration dashboard (Flywheel), integrated contracts and payments, AI-powered content review, and a real-time performance tracking dashboard with AI-generated report summaries.",
    "integrations": "The platform's AI actively scans Instagram and TikTok for influencer discovery. Specific third-party integrations are not detailed.",
    "other_info": "Founded in 2021. Hypefy has a dual presence with legal entities in the US (Delaware) and Croatia.",
    "Monthly traffic av 3 month": "56,100"
  },
  {
    "name": "Kobe Global Technologies",
    "website": "https://getkobe.com/",
    "type": "Agency",
    "Unified Type": "Agency",
    "business_model": "An AI-powered influencer marketing agency, likely operating on a service-based model (retainers or project fees).",
    "pricing": "Specifics on pricing, retainers, or minimum spend are not publicly disclosed.",
    "offer_usp": "An AI-powered influencer marketing agency that prioritizes 'relevance over popularity,' using its patented AI to match brands with the most suitable influencers to drive measurable results.",
    "sales_points": "Utilizes a patented AI that analyzes 26 data points across millions of creators for 'hyper-relevant' matching. Official partner of both TikTok and Meta. Highly decorated, winning the Gold award for 'Influencer Agency of the Year' from Marketing-Interactive five times consecutively (2020-2024). Offers specialized services in social live streaming and e-commerce ROI strategies. Has a network of 20,000-30,000+ creators in Southeast Asia.",
    "positioning": "A leading, AI-powered influencer marketing agency in Southeast Asia that sparks meaningful conversations by connecting brands with hyper-relevant influencers.",
    "client_profile": "A wide range of verticals, including FMCG, Retail, Finance, Travel, F&B, and Government. High-profile clients include McDonald's, Prime Video, CASETiFY, Coca-Cola, Great Eastern, and Lazada.",
    "geographical_focus": "Focused on Southeast Asia, with headquarters in Singapore and operations in Malaysia, the Philippines, Indonesia, Thailand, and Vietnam.",
    "social_media_links": "Active on LinkedIn (Kobe), Facebook (kobeglobal), Instagram (@getkobe), and TikTok (@getkobe).",
    "content_strategy_analysis": "Not provided in context.",
    "social_results": "Has access to over 600M+ in audience data via its creator network.",
    "marketing_strategy": "Marketing is driven by its numerous 'Agency of the Year' awards, official partnerships with TikTok and Meta, and case studies with major brands like McDonald's.",
    "technology_offering": "Utilizes a patented AI technology and a proprietary 'Kobe Relevance Concept' (KRC) for influencer matching and campaign strategy.",
    "technology_functions": "The AI analyzes 26 data points for hyper-relevant matching and provides campaign tracking dashboards.",
    "integrations": "Official Facebook Business Partner and a partner with TikTok.",
    "other_info": "Founded in 2016. The name Kobe (口碑) means 'word-of-mouth' in Chinese. Listed on the Singapore government portal beglobalready.gov.sg with a 'Good Company Report' for 2023.",
    "Monthly traffic av 3 month": "17,200"
  },
  {
    "name": "Pietra",
    "website": "https://www.pietrastudio.com/",
    "type": "Platform",
    "Unified Type": "Platform",
    "business_model": "A vertically integrated, AI-powered Commerce Operating System (OS) with a monthly subscription (SaaS) model.",
    "pricing": "Offers tiered monthly subscriptions: Pietra Essentials ($29/mo billed yearly), Pietra Business ($149/mo billed yearly), and Pietra Plus (custom pricing). Additional fees apply for payment processing and AI Content Studio usage.",
    "offer_usp": "An AI Commerce Operating System that provides an all-in-one, vertically integrated platform to help creators and e-commerce brands launch and scale product businesses by automating sourcing, supply chain, fulfillment, and marketing.",
    "sales_points": "AI-powered access to a network of over 50,000 global suppliers and factories. Integrated U.S. 3PL fulfillment network with no minimums or setup fees. AI agents automate marketing tasks, including influencer identification, content creation, and competitor monitoring. AI Design Studio turns sketches into production-ready 3D designs. Claims 40-50% savings on storage, fulfillment, and shipping. Trusted by over 300,000 brands and entrepreneurs.",
    "positioning": "An AI Commerce Operating System and the quickest path from idea to sale (<90 days), serving as a conversational AI business partner for creators and e-commerce brands.",
    "client_profile": "Creators, entrepreneurs, and e-commerce brands looking to launch and scale their own product-based businesses.",
    "geographical_focus": "Global, with an integrated U.S. 3PL network for fulfillment.",
    "social_media_links": "Active on Instagram, Facebook, Twitter, TikTok, and LinkedIn.",
    "content_strategy_analysis": "Marketing highlights case studies like Bad Mouth and Gel Blasters and promotes itself as the fastest way to launch a product business.",
    "social_results": "Has a 4.5 rating on Trustpilot.",
    "marketing_strategy": "Marketing is centered on the platform's powerful AI automation capabilities and its all-in-one, vertically integrated solution, positioning it as a comprehensive OS for modern commerce.",
    "technology_offering": "An AI Commerce Operating System with multiple AI models and purpose-built 'AI Assistants' that connect to business data. The 'Pietra Copilot' serves as a conversational AI business partner.",
    "technology_functions": "AI-powered supplier sourcing and negotiation, AI design and content generation, AI-powered inventory forecasting, automated marketing (influencer outreach, content creation, competitor monitoring), and e-commerce storefront management.",
    "integrations": "Deeply integrates with key e-commerce and marketing platforms, including Shopify, Amazon, TikTok Shop, Wix, WooCommerce, Meta, and Google.",
    "other_info": "Co-founded in 2019 by former Uber employees Ronak Trivedi (CEO) and Pan Pan (CTO).",
    "Monthly traffic av 3 month": "125,435"
  },
  {
    "name": "SuperOrdinary",
    "website": "https://www.superordinary.co/",
    "type": "Agency",
    "Unified Type": "Agency",
    "business_model": "A global, social commerce-first agency that takes a percentage of every transaction conducted across its platforms.",
    "pricing": "Not publicly disclosed.",
    "offer_usp": "A global, social commerce-first agency and certified TikTok Shop partner specializing in growing brands on platforms like TikTok Shop and Amazon, with deep expertise in cross-border commerce.",
    "sales_points": "Certified TikTok Shop partner. Strong presence and expertise in the Chinese market (Douyin), generating over $500 million in sales since 2018. Manages a vast network of over 400,000 active affiliates and creators in the U.S. Offers end-to-end services, including custom livestream production, creator live ops, and logistics. Has generated over $40 million in GMV via TikTok Shop. Acquired Fanfix, a creator monetization startup.",
    "positioning": "A global, social commerce-first agency that helps brands navigate and grow on platforms like TikTok Shop and Amazon, leveraging data-driven strategies and deep cross-border expertise.",
    "client_profile": "Global and emerging brands looking to enter or scale on social commerce platforms, particularly TikTok Shop and in the Chinese market. Has helped launch brands like Supergoop, Olaplex, and Milk Makeup on these platforms.",
    "geographical_focus": "Global, with strong expertise in the US and Chinese markets. Has a 300-person office in Shanghai and expanded to Los Angeles in 2021.",
    "social_media_links": "Not provided in context.",
    "content_strategy_analysis": "Not provided in context.",
    "social_results": "Has generated over $40 million in GMV via TikTok Shop and conducted over 4,500 hours of livestream shopping.",
    "marketing_strategy": "Marketing is driven by its certified TikTok Shop partner status, impressive sales figures, and case studies of successfully launching major US brands into the Chinese market and onto TikTok Shop.",
    "technology_offering": "The agency is platform-agnostic and data-driven, but no specific proprietary technology is mentioned. It uses collected data insights to sell back to brands and creators.",
    "technology_functions": "Brand Management & Strategy, E-Commerce & Shop Management, Paid Media, Data Analysis, Creative & Content Strategy, Demand Planning & Forecasting, and Creator Live Ops.",
    "integrations": "Certified TikTok Shop partner. Manages brand growth on TikTok Shop, Amazon, and other platforms.",
    "other_info": "Raised a $58 million Series B round in 2023, boosting its valuation to over $800 million. Launched SuperOrdinary Studios in July 2025 to focus on creator-led entertainment fused with social commerce.",
    "Monthly traffic av 3 month": "4,700"
  },
  {
    "name": "Z Media",
    "website": "https://z.media/",
    "type": "Agency",
    "Unified Type": "Agency",
    "business_model": "A full-service agency specializing in TikTok Shop, likely operating on retainers or project fees.",
    "pricing": "Not publicly disclosed.",
    "offer_usp": "The world's first 'social commerce powerhouse' and an official TikTok Shop Partner agency that creates compounding revenue engines for brands by integrating culture, creativity, commerce, and community.",
    "sales_points": "One of the first official TikTok Shop Partner agencies in the Western world (UK and US). Has driven over $50 million in GMV on TikTok Shop. Achieves a monthly reach of over 100 million. Manages the entire social commerce pipeline for brands, including affiliates, UGC, and shop operations. Offers education and training through 'The Creator University™'. Utilizes a proprietary AI platform called 'TokShopOS™'.",
    "positioning": "A specialist agency that helps brands master TikTok Shop by integrating content, community, and commerce.",
    "client_profile": "Brands looking to scale on TikTok Shop. Notable client successes include Anastasia Beverly Hills ($187k in sales in 30 days), Filter By Molly-Mae (91x ROI), MyProtein (27x ROI), and COSRX ($127k in sales in 30 days).",
    "geographical_focus": "Focused on Western markets, with headquarters in London, UK, and a location in Los Angeles, US.",
    "social_media_links": "LinkedIn (Z MEDIA® GROUP), Instagram (@zmediahq), TikTok (@zmediahq), and YouTube (@zmediahq).",
    "content_strategy_analysis": "Not provided in context.",
    "social_results": "A campaign for LuckyTrip generated over 100,000 app installs in 3 weeks, reaching the #1 travel app spot in the UK App Store.",
    "marketing_strategy": "Marketing is heavily based on showcasing impressive, quantifiable results (GMV, ROI) for well-known brands on TikTok Shop. Its status as an early and official TikTok Shop partner is a key credential.",
    "technology_offering": "Utilizes a proprietary AI platform called 'TokShopOS™'.",
    "technology_functions": "The functions of TokShopOS™ are not detailed, but it likely supports the agency's management of content, affiliates, and shop operations on TikTok.",
    "integrations": "As an official TikTok Shop Partner, the agency has deep integration with the TikTok platform.",
    "other_info": "Founded in 2020 by Remy.",
    "Monthly traffic av 3 month": "985"
  },
  {
    "name": "ShopShops",
    "website": "https://shopshopslive.com/",
    "type": "Platform (Marketplace)",
    "Unified Type": "Platform",
    "business_model": "A global, interactive livestreaming e-commerce marketplace. It charges sellers a commission on sales and consumers a platform fee at checkout.",
    "pricing": "Sellers are charged a commission on the price paid by the consumer. A platform fee is charged to the consumer at checkout. Sellers may also be responsible for ancillary fees like shipping, taxes, and chargebacks.",
    "offer_usp": "The '#1 destination for livestream shopping,' providing a global marketplace that connects sellers directly with consumers through interactive 'Live Shows.'",
    "sales_points": "Serves a global audience of 2.7 million users (as of April 2023) with a high concentration in the US, Japan, China, and Europe. Caters to a wide range of sellers, from iconic retail stores to independent businesses. Supports categories including fashion, beauty, home, food, and authentic pre-owned luxury. Partners with Entrupy for authenticating luxury goods. Offers multichannel sell-through services.",
    "positioning": "A global livestream shopping marketplace that enables sellers to create their own storefronts, manage inventory, and sell goods directly to consumers via interactive live shows.",
    "client_profile": "Sellers of all types, including iconic retail stores, fashion brands, local boutiques, and independent businesses.",
    "geographical_focus": "Global, with a high concentration of users in the US, Japan, China, and Europe.",
    "social_media_links": "Not provided in context.",
    "content_strategy_analysis": "Not provided in context.",
    "social_results": "Has 2.7 million users as of April 2023.",
    "marketing_strategy": "Not provided in context.",
    "technology_offering": "A livestreaming e-commerce marketplace platform.",
    "technology_functions": "Seller storefront creation, inventory management, live show production and broadcasting, and payment processing.",
    "integrations": "Partners with Shop Pay and Afterpay for payments and Entrupy for luxury goods authentication.",
    "other_info": "ShopShops is the sole owner of all rights to the Live Shows produced on its platform. Payouts to sellers are initiated when their payable balance exceeds $2,000 USD or 30 days have passed since the last payment.",
    "Monthly traffic av 3 month": "14,700"
  },
  {
    "name": "Gushcloud",
    "website": "https://www.gushcloud.com/",
    "type": "Mix (Agency, Talent Management, Live Commerce)",
    "Unified Type": "Mix (Agency, Talent Management Companie)",
    "business_model": "A global creator management and licensing company operating through four specialized units: Agency (marketing), Entertainment (creator IP), Studios (content), and GC Live (live commerce). Model is based on talent management, campaign execution, and revenue sharing.",
    "pricing": "Not publicly disclosed.",
    "offer_usp": "A global creator management and licensing company with a strong foothold in Southeast Asia, building a sustainable creator economy through data-driven brand partnerships, IP licensing, and live commerce.",
    "sales_points": "Global presence in 13 countries with a strong focus on Southeast Asia. Partners with over 20,000 creators globally and executes 5,000+ campaigns annually. Operates a dedicated live commerce unit, GC Live, selling global brands into SEA. An initial partner for YouTube's Creator Solutions program in Southeast Asia. Partnering with the Abu Dhabi Investment Office to launch a global creator hub. Acquired Wizdeo's MCN in June 2025 to build a '$1 billion creator business'.",
    "positioning": "A global creator and entertainment company focused on 'Tomorrow's Positive Influence,' building a positive, engaging, and sustainable creator economy.",
    "client_profile": "Global brands seeking to engage audiences in Southeast Asia and beyond. Notable clients include Innisfree and Laneige. Also represents over 20,000 creators.",
    "geographical_focus": "Global, with headquarters in Singapore and a strong presence across Southeast Asia (Indonesia, Malaysia, Thailand, Vietnam, Philippines) and other regions (USA, Korea, UAE, China, Japan).",
    "social_media_links": "Active on Instagram (@gushcloud_intl), TikTok (@gushcloud_intl), X (@gushcloud_intl), LinkedIn (Gushcloud), and Facebook (Gushcloud).",
    "content_strategy_analysis": "Not provided in context.",
    "social_results": "A US campaign for Innisfree generated 625.2K views. A TikTok campaign for a LazLive show garnered 1 million views.",
    "marketing_strategy": "Marketing is driven by PR around its strategic acquisitions, high-profile government partnerships (ADIO), and its role as a key partner for platforms like YouTube in the SEA region.",
    "technology_offering": "Utilizes proprietary tools including www.gushad.com, www.gushmedia.co, and the Gush Pro App, which leverage AI for influencer selection and campaign insights.",
    "technology_functions": "AI-powered influencer selection, campaign insights, and creator monetization tools.",
    "integrations": "As a partner for YouTube's Creator Solutions program, it has deep integration with YouTube. It also executes campaigns on platforms like LazLive and TikTok Shop.",
    "other_info": "Founded in 2011. The founders bought back the company from Yello Digital Marketing Group in 2018. Co-founder Althea Lim has received numerous leadership awards.",
    "Monthly traffic av 3 month": "8,300"
  },
  {
    "name": "Partipost",
    "website": "https://partipost.com/",
    "type": "Platform (Marketplace)",
    "Unified Type": "Platform",
    "business_model": "A crowd influencer marketing and commerce platform operating as a marketplace. It takes a percentage of the campaign earnings negotiated between the brand and creator.",
    "pricing": "Public pricing is not disclosed. The model is based on a commission from campaign spend.",
    "offer_usp": "A crowd influencer marketing platform that democratizes advertising by connecting brands with a large network of nano- and micro-influencers to generate authentic word-of-mouth at scale.",
    "sales_points": "Boasts a network of over 900,000 influencers, primarily nano- and micro-influencers, across 8 Asian markets. Operates as a marketplace where influencers proactively select campaigns to join. Integrates with Shopee's Affiliate Marketing Solution (AMS) for commission-based campaigns. Brands can reuse creator content for up to one year without additional fees. Has raised $12M-$17.8M in funding.",
    "positioning": "A crowd influencer marketing and commerce platform that aims to redistribute advertising spend from tech giants to everyday people, enabling authentic word-of-mouth advertising.",
    "client_profile": "Brands of all sizes seeking to engage nano- and micro-influencers in Southeast Asia. Has worked with over 100 brands in the Philippines alone, including Sensodyne, Viu, GCash, Milo, and Unilever (Pond's).",
    "geographical_focus": "Focused on Southeast and East Asia, with headquarters in Singapore and operations in Indonesia, Taiwan, Vietnam, Malaysia, and the Philippines.",
    "social_media_links": "Active on LinkedIn (Partipost, with 40,171 followers), Facebook (@partipostph), TikTok (@partipostph), Twitter (@partipost_ph), and YouTube (@partipost_ph).",
    "content_strategy_analysis": "Not provided in context.",
    "social_results": "The Philippines market alone accounts for over 50,000 creators.",
    "marketing_strategy": "Marketing focuses on its mission to 'democratize' influencer marketing and its large, accessible network of everyday creators. Case studies for major brands like Traveloka and GCash demonstrate its effectiveness.",
    "technology_offering": "A marketplace platform with a Campaign Manager dashboard for brands and a mobile app for creators.",
    "technology_functions": "Influencer selection, campaign tracking and analytics, content submission and approval, and creator payment management.",
    "integrations": "Integrates with Shopee's Affiliate Marketing Solution (AMS). Supports campaigns on TikTok Shop.",
    "other_info": "Founded in 2016. Raised a $7M Series B round in October 2022. The platform emphasizes actual payments for creators, rather than just product seeding.",
    "Monthly traffic av 3 month": "27,335"
  },
  {
    "name": "VoxFeed",
    "website": "Not provided in context. (https://www.voxfeed.com/)",
    "type": "Platform",
    "Unified Type": "Platform",
    "business_model": "A performance-based platform with a free tier. It charges a fee per post only if the post achieves a minimum level of engagement.",
    "pricing": "Offers a 'Free Tier' and a 'PRO' tier. For paid campaigns, it charges $0 or 10% per post (whichever is higher) and only requires payment for posts that achieve at least 5 engagements. This eliminates subscriptions or long-term contracts.",
    "offer_usp": "The 'First Free Influencer Marketing Platform' that connects brands with influencers and brand advocates in Latin America on a performance-based model.",
    "sales_points": "Free access to a global database of over 40,000 verified creators. Performance-based pricing model minimizes risk for brands. Includes a content review and approval process for brand safety. Offers a specialized platform for artists and music labels. Proven results with clients like AirBnB (+321% traffic) and CPK (+76% sales).",
    "positioning": "A community-focused platform that turns customers into brand advocates, making influencer marketing accessible and performance-driven.",
    "client_profile": "Brands seeking to engage influencers and brand advocates in Mexico and Latin America. Notable case studies include campaigns for AirBnB, CPK, and EF English.",
    "geographical_focus": "Primarily focused on Mexico and Latin America. Headquartered in Guadalajara, Mexico.",
    "social_media_links": "Not provided in context.",
    "content_strategy_analysis": "Not provided in context.",
    "social_results": "Not provided in context.",
    "marketing_strategy": "Marketing is centered on its unique 'First Free Influencer Marketing Platform' positioning and its risk-free, performance-based pricing model.",
    "technology_offering": "An influencer marketing platform with proprietary technology for segmentation, management, tracking, and payments.",
    "technology_functions": "Profile segmentation, content management, content review and approval, real-time metrics dashboard, and payment processing.",
    "integrations": "Offers a Shopify integration for recruiting brand ambassadors.",
    "other_info": "Founded in 2012. Received seed funding from investors like GAIN Capital and Sage Venture Partners. Recent news from March 2025 indicated that the music-focused division of VoxFeed was for sale.",
    "Monthly traffic av 3 month": "8,700"
  },
  {
    "name": "FLUVIP",
    "website": "https://www.fluvip.com/en",
    "type": "Mix (Agency & Technology)",
    "Unified Type": "Agency",
    "business_model": "A technology-driven influencer marketing agency offering 360-degree campaign execution.",
    "pricing": "Not publicly detailed; potential clients are prompted to 'Request a proposal.'",
    "offer_usp": "A leading influencer marketing technology company in Latin America and Spain that connects brands with audiences using creativity, data, and artificial intelligence, with the ability to predict campaign results with up to 90% accuracy.",
    "sales_points": "Operates in 9 countries across Latin America and Spain. Uses proprietary AI technology to predict campaign results. Offers 360-degree campaign execution, from strategy to optimization. Provides innovative solutions like AI Twin and virtual influencers. Has worked with over 650 global brands. Part of the larger Cisneros Interactive group.",
    "positioning": "A leading influencer marketing technology company in Latin America and Spain.",
    "client_profile": "Global brands seeking to run influencer campaigns in Latin America and Spain.",
    "geographical_focus": "Focused on Latin America and Spain, with headquarters in Bogotá, Colombia, and a primary location in Miami.",
    "social_media_links": "Not specified",
    "content_strategy_analysis": "FLUVIP emphasises creativity, data and artificial intelligence to produce campaigns that achieve specific goals. Their site explains that they connect brands with real audiences across Latin America and Spain and run campaigns aligned with business objectives like awareness, engagement or sales. They use authentic influencers who inspire trust and generate real impact, and measure results using data and optimisation at every step of the campaign. The company positions itself as a strategic ally for agencies, providing 360° execution from creative strategy through final optimisation, with regional execution in nine countries and local billing. Proprietary AI technology offers up to 90% accuracy in predicting results and delivers real‑time reports, ensuring transparency and measurable outcomes.",
    "social_results": "FLUVIP highlights more than 10 years of experience in influencer marketing and a regional presence across nine countries. They report serving over 650 global brands and managing more than 1,000 campaigns with an 80% client retention rate. Their proprietary AI provides up to 90% accuracy in predicting campaign results and real‑time reporting.",
    "marketing_strategy": "Marketing is driven by its positioning as a technology leader in the region, its AI prediction capabilities, and its affiliation with Cisneros Interactive.",
    "technology_offering": "A proprietary AI platform for influencer marketing.",
    "technology_functions": "Predictive analytics for campaign results, real-time reporting, certified payments, influencer identification across multiple channels, and user reaction measurement for segmentation.",
    "integrations": "Supports campaigns on Twitter, Facebook, Instagram, and YouTube.",
    "other_info": "Founded in 2013. Now part of Cisneros Interactive. Has completed five funding rounds, including a Series A.",
    "Monthly traffic av 3 month": "6,400"
  },
  {
    "name": "Airfluencers",
    "website": "https://air.com.vc/",
    "type": "Mix (Agency & Technology)",
    "Unified Type": "Agency",
    "business_model": "An agency that connects brands with influencers using technology and strategic intelligence.",
    "pricing": "Pricing details are not publicly available.",
    "offer_usp": "A pioneering Brazilian agency that connects brands with influencers using a combination of technology, strategic intelligence, and a platform containing millions of Brazilian influencer profiles.",
    "sales_points": "A pioneer in the Brazilian market, founded in 2016. Platform contains millions of Brazilian influencer profiles with extensive filtering options. Offers Permeets, a data management solution for privacy compliance and marketing optimization. Backed by BoostLAB.",
    "positioning": "A Brazilian agency connecting brands and influencers through technology and strategic intelligence.",
    "client_profile": "Brands seeking to run influencer campaigns in Brazil.",
    "geographical_focus": "Primarily focused on the Brazilian market. Based in São Paulo.",
    "social_media_links": "Instagram: https://www.instagram.com/air.com.vc/; TikTok: https://www.tiktok.com/@air.com.vc; LinkedIn: https://www.linkedin.com/company/air-com-vc/?viewAsMember=true; YouTube: https://www.youtube.com/@aircomvc",
    "content_strategy_analysis": "Air (formerly Airfluencers) positions itself as a pioneer of influencer marketing in Brazil. The company states that it 'breathes influence' and was born to transform the relationship between people and brands. With nine years of experience and more than 1,000 campaigns, Air combines empathy, creativity and technology to convert conversations into memorable campaigns and guarantees impact. Its method pairs data-driven insight with human creativity — studying, analysing, measuring and connecting brands directly with consumers via creators who drive conversion. Air’s solutions include the AirSearch platform for influencer discovery, custom managed campaigns, insights and Aira — an AI system for smart influencer curation.",
    "social_results": "Air reports more than nine years of market experience, more than 1,000 campaigns executed, service for over 50 brands simultaneously and an 80% customer retention rate.",
    "marketing_strategy": "Air's marketing strategy centres on combining intelligence with creativity. The agency believes impact is not luck but method — combining empathy, data and technology to deliver personalised campaigns. Their approach involves listening to audiences, analysing data, designing creative concepts and measuring performance to connect brands directly to consumers through creators who generate real conversion.",
    "technology_offering": "An influencer marketing platform and Permeets, a data management solution for privacy compliance.",
    "technology_functions": "Campaign management, influencer discovery with extensive filters, and financial organization.",
    "integrations": "Utilizes tools like WordPress.org and Google Tag Manager.",
    "other_info": "Founded in 2016. Funded in a seed round by BoostLAB.",
    "Monthly traffic av 3 month": "7,000"
  },
  {
    "name": "Squid",
    "website": "https://squid.com.br/",
    "type": "Mix (Platform & Agency)",
    "Unified Type": "Mix (Agency & Platform)",
    "business_model": "A hybrid platform and agency with a performance-based model called 'Squid Growth,' where brands pay for results like clicks or leads.",
    "pricing": "Operates on a performance-based model ('Squid Growth') rather than a flat fee.",
    "offer_usp": "A technology company with the largest base of influencers in Latin America (300,000+), offering a performance-based model and specialization as an official partner of the TikTok Creative Exchange (TTCX).",
    "sales_points": "Largest base of influencers in Latin America with over 300,000 registered creators. Official partner of the TikTok Creative Exchange (TTCX), specializing in TikTok-first content. Offers a performance-based model where brands pay for results. Uses AI and machine learning with over 70 metrics to identify ideal influencers. Has delivered over 12,000 campaigns.",
    "positioning": "A technology company and hybrid platform/agency, part of the Wake ecosystem, particularly suited for brands managing hundreds of smaller creators in Latin America.",
    "client_profile": "Brands managing large numbers of nano to macro creators, especially those focused on performance marketing and TikTok content.",
    "geographical_focus": "Focused on Latin America, with headquarters in São Paulo, Brazil.",
    "social_media_links": "Not specified",
    "content_strategy_analysis": "Squid is presented as a technology company passionate about the creator economy. Its site states that, after 11 years of experience, Squid leads influencer marketing strategy and operations using creativity, data and a community of 300,000 certified creators. Proprietary technology provides audited data, automated payments and legal processes, agile profile approval, real-time reports, personalised performance analysis and complete creator management. For brands, Squid offers planning, market intelligence, influencer curation, seeding and production, media placements and customised research.",
    "social_results": "Squid highlights having 11 years of experience in influencer marketing and a community of more than 300,000 certified creators, which it uses to connect brands to scalable, real results.",
    "marketing_strategy": "Marketing is driven by its status as the largest influencer network in LATAM and its official partnership with the TikTok Creative Exchange.",
    "technology_offering": "An influencer marketing platform that uses AI and machine learning.",
    "technology_functions": "AI-powered influencer identification (using 70+ metrics), campaign management, and performance tracking.",
    "integrations": "Official partner of the TikTok Creative Exchange (TTCX).",
    "other_info": "Founded in 2014. Operates as Squid Creators and is part of the Wake ecosystem.",
    "Monthly traffic av 3 month": "2,400"
  },
  {
    "name": "Influency.me",
    "website": "https://influency.me/",
    "type": "Mix (Platform, Agency, Talent Management)",
    "Unified Type": "Mix (Agency, Talent Management, Platform)",
    "business_model": "Offers a multi-faceted model: a software-as-a-service (SaaS) platform, a 'Full Service' agency model, an 'Express' solution for SMBs, and a talent management agency (Influency.me Stars).",
    "pricing": "Specific pricing is not detailed, but an accessible 'Express' solution is available for SMBs.",
    "offer_usp": "A leading Brazilian influencer marketing company offering a complete, integrated solution that combines a SaaS platform, full-service agency, SMB solution, and talent management.",
    "sales_points": "Offers a complete, all-in-one solution for influencer marketing. Platform uses proprietary AI to generate data from millions of influencers worldwide. Features an automated 'Influencer Relationship Scoring' (IRS) system. Serves over 300 subscribers, including major brands like Nestlé, Globo, and Philips. Hosts the notable 'Prêmio Influency.me' awards.",
    "positioning": "A leading Brazilian influencer marketing platform and service provider that simplifies the entire process for brands of all sizes.",
    "client_profile": "A wide range of clients from small and medium businesses ('Express' solution) to large enterprises. Notable clients include Nestlé, Vigor, Globo, TIM Brasil, and Philips.",
    "geographical_focus": "Primarily focused on the Brazilian market. Based in São Paulo.",
    "social_media_links": "Facebook: https://www.facebook.com; Instagram: https://www.instagram.com; LinkedIn: https://www.linkedin.com; YouTube: https://www.youtube.com; TikTok: https://www.tiktok.com",
    "content_strategy_analysis": "Influency.me positions itself as a high‑performance influencer marketing partner. Its Influency.meStudio platform enables brands to find influencers quickly, negotiate and contract them, plan campaigns end‑to‑end in one place, manage activities, contracts and payments, automatically capture posts and stories, and measure results in real time. The Influency.me House service handles complete campaigns on behalf of clients, delivering creative and strategic pillars and guaranteeing results by contract. The company emphasises data‑driven decision‑making, automation to improve productivity and organisation by centralising campaigns, and operates across five Latin American countries with nearly a decade of experience.",
    "social_results": "Influency.me notes that its high‑performance methodology delivers guaranteed results backed by contract and that its platform helps brands achieve greater assertiveness, productivity and organisation in campaigns. The company highlights nearly ten years of experience and clients in five Latin American countries.",
    "marketing_strategy": "Marketing is driven by its high-profile client list, its position as a comprehensive solution provider, and the publicity from its own 'Prêmio Influency.me' awards.",
    "technology_offering": "A comprehensive influencer marketing platform with proprietary AI.",
    "technology_functions": "Influencer search engine with over 20 filters, campaign planning, contract management, automated content capture, results measurement, and an automated 'Influencer Relationship Scoring' (IRS) system.",
    "integrations": "Integrates with tools like WooCommerce and WordPress.",
    "other_info": "Established in 2018. Raised a Series A round in 2021.",
    "Monthly traffic av 3 month": "35,265"
  },
  {
    "name": "Modash",
    "website": "https://www.modash.io/",
    "type": "Platform",
    "Unified Type": "Platform",
    "business_model": "An end-to-end influencer marketing platform, likely with a subscription-based model. Offers a 14-day free trial.",
    "pricing": "Offers a 14-day free trial with no credit card required. Specific pricing tiers are not detailed.",
    "offer_usp": "An end-to-end influencer marketing platform designed to help every creator get paid by shifting influencer marketing from an experimental spend to a performance-based advertising channel.",
    "sales_points": "Offers a 14-day free trial. Provides an Influencer Marketing API for custom solutions. Features unique tools like audience-targeted influencer search and conversion rate attribution. Acquired Promoty in January 2025. Raised a $12 million Series A in October 2024.",
    "positioning": "An end-to-end influencer marketing platform for brands to find, analyze, and scale partnerships with creators.",
    "client_profile": "Primarily targets Shopify brands and other companies looking to scale performance-based influencer partnerships.",
    "geographical_focus": "Global. Headquartered in Tallinn, Estonia.",
    "social_media_links": "Not provided in context.",
    "content_strategy_analysis": "Not provided in context.",
    "social_results": "Not provided in context.",
    "marketing_strategy": "Marketing strategy includes offering a 14-day free trial and promoting its unique performance-based features and recent funding success.",
    "technology_offering": "An end-to-end influencer marketing platform with an API and AI-powered discovery.",
    "technology_functions": "Influencer Marketing API, AI-powered discovery, audience-targeted influencer search, conversion rate attribution, influencer relationship management, tracking, and payments.",
    "integrations": "Key integrations with Shopify and email platforms.",
    "other_info": "Founded in 2018. Acquired Promoty in January 2025. Raised $14 million across two funding rounds.",
    "Monthly traffic av 3 month": "721,100"
  },
  {
    "name": "HypeAuditor",
    "website": "https://hypeauditor.com/",
    "type": "Platform",
    "Unified Type": "Platform",
    "business_model": "An all-in-one influencer marketing platform with a freemium model.",
    "pricing": "Offers a free-to-start option that includes free media plans and demo versions of its features. Detailed pricing for paid tiers is available on its website.",
    "offer_usp": "A 100% AI-powered, all-in-one influencer marketing platform providing data-driven tools with a strong emphasis on fraud detection, audience analytics, and competitive insights.",
    "sales_points": "AI-powered platform with a database of over 219 million profiles. Provides over 35 metrics for influencer performance and advanced algorithms for fraud detection. Recognized in Inc. Magazine’s 2025 Power Partners list for two consecutive years. Offers a free-to-start option. Case studies show strong results, such as a 6x ROAS for Smile Hair Clinic.",
    "positioning": "A data-driven, AI-powered platform for influencer marketing, focused on analytics, fraud detection, and market analysis.",
    "client_profile": "Brands and agencies seeking data-driven campaign tools. Case studies feature clients like MSI Gaming, Taj Exotica Resort & Spa, and Smile Hair Clinic.",
    "geographical_focus": "Global. Headquarters are listed in Indianapolis, IN, with associations to Estonia and Cyprus.",
    "social_media_links": "LinkedIn: https://www.linkedin.com/company/hypeauditor; Twitter: https://twitter.com/hypeauditor; Facebook: https://www.facebook.com/hypeauditor; Instagram: https://www.instagram.com/hypeauditor",
    "content_strategy_analysis": "HypeAuditor is a 100 % AI‑powered, all‑in‑one influencer marketing platform. Its modules include creator management, a discovery tool covering 219.6 million profiles with over 35 filters, influencer analytics with audience quality and fraud detection metrics, recruitment and outreach tools, and campaign management. Additional features include media monitoring, predictive planning, market and competitor analysis, e‑commerce monitoring, influencer payments via PayPal, a Chrome extension, Zapier integration and an API. The platform emphasises data‑driven insights and emerging trend analysis to help brands find, vet and activate creators and track competitors.",
    "social_results": "HypeAuditor boasts a database of over 219.6 million influencer profiles and provides brands with more than 35 metrics to evaluate audience authenticity and engagement. The company notes that its AI analyzes more than 100 billion data points to deliver insights for Fortune 500 brands.",
    "marketing_strategy": "Marketing is driven by HypeAuditor’s AI and data focus. The company offers a freemium model and free tools such as media plans, influencer analytics and webinars to attract users while highlighting its recognition by publications like Inc. Magazine and its suitability for brands seeking data‑driven decisions.",
    "technology_offering": "A 100 % AI‑powered influencer marketing platform.",
    "technology_functions": "Influencer discovery, analytics with 35+ metrics and fraud detection, campaign management, media planning, market and competitor analysis, e‑commerce monitoring, payment processing, Chrome extension, Zapier integration and an API.",
    "integrations": "Integrates with PayPal for influencer payments and offers a Chrome extension, Zapier integration and an API for workflow automation.",
    "other_info": "Founded in 2017 with headquarters linked to Indianapolis, Estonia and Cyprus. Funded by Embria.",
    "Monthly traffic av 3 month": "879,800"
  },
  {
    "name": "Buzzoole",
    "website": "https://buzzoole.com/",
    "type": "Mix (Platform & Agency)",
    "Unified Type": "Mix (Agency & Platform)",
    "business_model": "A MarTech company offering 360-degree solutions on a flexible Cost-Per-Post (CPP) model.",
    "pricing": "Operates on a flexible Cost-Per-Post (CPP) model, with pricing starting 'from $0.' This model allows brands to pay based on the posts generated by influencers.",
    "offer_usp": "An Italian MarTech company that provides 360-degree influencer marketing solutions using in-house AI to automate and optimize collaborations, claiming to save clients up to 70% compared to traditional agencies.",
    "sales_points": "Flexible and cost-effective Cost-Per-Post (CPP) pricing model. Proprietary AI platform analyzes over 2 million global influencer profiles and 770 million pieces of content in real-time. Has served over 900 customers and managed over 1 million campaigns. Works with top global brands like Amazon, Canon, Samsung, and Starbucks. Founder, Fabrizio Perrone, has been recognized by Forbes and Fortune.",
    "positioning": "A MarTech company that uses proprietary AI to increase the efficiency and reduce the cost of influencer marketing collaborations.",
    "client_profile": "Top global brands. Clients include Amazon, Canon, Samsung, Bacardi, KFC, and Starbucks.",
    "geographical_focus": "Global. Headquartered in Milan, Italy.",
    "social_media_links": "Instagram: https://www.instagram.com/buzzoole; LinkedIn: https://www.linkedin.com/company/buzzoole; Twitter: https://twitter.com/buzzoole",
    "content_strategy_analysis": "Buzzoole describes itself as an “Agent of Influence” that accelerates trust between brands and audiences by turning data into strategic storytelling and converting influence into measurable results. The company tracks over 770 million pieces of content, analyses more than two million profiles, has managed more than 808 campaigns and served over 900 customers. Its in‑house AI provides 360‑degree solutions across discovery, management and measurement, with modules such as Discovery, Tracker, Campaign Management and Check Up.",
    "social_results": "Buzzoole reports analysing more than two million creator profiles and tracking over 770 million pieces of content, managing more than 808 campaigns for more than 900 customers.",
    "marketing_strategy": "The company promotes its flexible Cost‑Per‑Post pricing model starting from $0 and highlights its proprietary AI technology and comprehensive modules. It leverages its impressive client list and case studies to demonstrate cost efficiency and performance.",
    "technology_offering": "The Buzzoole Suite and Buzzoole Check Up, both powered by in‑house artificial intelligence.",
    "technology_functions": "Discovery module for influencer search and selection using advanced filters and proprietary metrics; Tracker to monitor creators and brand mentions; Campaign Management to manage programmes; and Check Up to analyse influencer marketing performance.",
    "integrations": "Supports campaigns on major social platforms such as Instagram, YouTube and TikTok.",
    "other_info": "Founded in 2013 and headquartered in Milan, Italy. The company has raised multiple funding rounds and serves clients such as Amazon, Canon, Samsung and Bacardi.",
    "Monthly traffic av 3 month": "7,800"
  }
];

// Utility functions
const getSimplifiedType = (type) => {
  if (!type) return 'Other';
  const t = type.replace('Companie', 'Company').toLowerCase();
  if (t.includes('mix')) return 'Mix';
  if (t.includes('platform') && !t.includes('agency') && !t.includes('talent') && !t.includes('mcn')) return 'Platform';
  if ((t.includes('talent') || t.includes('mcn')) && !t.includes('agency') && !t.includes('platform')) return 'Talent Management';
  if (t.includes('agency') && !t.includes('platform') && !t.includes('talent') && !t.includes('mcn')) return 'Agency';
  return 'Mix';
};

const getPriceSegment = (pricing) => {
  if (!pricing) return 'Custom';
  const p = pricing.toLowerCase();
  if (p.includes('free') && (p.includes('$0') || p.includes('freemium') || p.match(/free\s*(plan|tier|to)/))) return 'Freemium';
  if (p.includes('$50,000') || p.includes('$100,000') || p.includes('$30,000') || p.includes('enterprise')) return 'Enterprise';
  if (p.includes('$20,000') || p.includes('$10,000') || p.includes('$5,000')) return 'Mid-Market';
  if (p.match(/\$[1-9]\d{0,2}[\/\s]/) || p.includes('$29') || p.includes('$49') || p.includes('$99') || p.includes('$149') || p.includes('$199') || p.includes('$460')) return 'SMB';
  return 'Custom';
};

const getRegion = (geo) => {
  if (!geo) return 'Global';
  const g = geo.toLowerCase();
  if (g.includes('global')) return 'Global';
  if (g.includes('china') || g.includes('chinese') || g.includes('shanghai') || g.includes('shenzhen')) return 'China';
  if (g.includes('sea') || g.includes('singapore') || g.includes('indonesia') || g.includes('apac')) return 'Asia/SEA';
  if (g.includes('latin') || g.includes('brazil') || g.includes('mexico') || g.includes('são paulo')) return 'LatAm';
  if (g.includes('uk') || g.includes('london') || g.includes('europe')) return 'Europe';
  if (g.includes('usa') || g.includes('us') || g.includes('america') || g.includes('new york') || g.includes('los angeles')) return 'North America';
  return 'Global';
};

const hasTech = (company) => {
  const tech = company.technology_offering?.toLowerCase() || '';
  return tech && !tech.includes('n/a') && !tech.includes('not ') && tech.length > 15;
};

const getClientSegment = (clientProfile = '') => {
  const c = clientProfile.toLowerCase();
  if (c.includes('fortune') || c.includes('enterprise') || c.includes('global brand') || c.includes('large')) return 'Enterprise';
  if (c.includes('mid-market') || c.includes('mid market')) return 'Mid-Market';
  if (c.includes('smb') || c.includes('small') || c.includes('startup') || c.includes('small business')) return 'SMB/Startup';
  if (c.includes('creator') || c.includes('talent')) return 'Creators/Talent';
  return 'Mixed';
};

const getTechCategory = (company) => {
  const off = (company.technology_offering || '').toLowerCase();
  const func = (company.technology_functions || '').toLowerCase();
  if (!hasTech(company)) return 'Service-led';
  if (off.includes('ai') || func.includes('ai') || func.includes('analytics') || func.includes('data')) return 'AI / Analytics';
  if (off.includes('marketplace') || func.includes('marketplace')) return 'Marketplace';
  if (off.includes('platform') || func.includes('suite') || func.includes('os')) return 'Platform Suite';
  return 'Tech-enabled';
};

const getTrafficBucket = (traffic) => {
  if (!traffic && traffic !== 0) return 'Unknown';
  if (traffic > 1000000) return '1M+';
  if (traffic > 100000) return '100K - 1M';
  if (traffic > 10000) return '10K - 100K';
  if (traffic > 1000) return '1K - 10K';
  return '< 1K';
};

// Color scheme
const typeColors = {
  'Agency': '#EF4444',
  'Platform': '#06B6D4',
  'Talent Management': '#F59E0B',
  'Mix': '#10B981'
};

const priceOrder = ['Enterprise', 'Mid-Market', 'Custom', 'SMB', 'Freemium'];

const regionOrder = ['Global', 'North America', 'Europe', 'Asia/SEA', 'LatAm', 'China'];

const clientOrder = ['Enterprise', 'Mid-Market', 'SMB/Startup', 'Creators/Talent', 'Mixed'];

const techOrder = ['Platform Suite', 'AI / Analytics', 'Marketplace', 'Tech-enabled', 'Service-led'];

const trafficOrder = ['1M+', '100K - 1M', '10K - 100K', '1K - 10K', '< 1K', 'Unknown'];

const axisOptions = [
  { id: 'price', label: 'Pricing Tier', buckets: priceOrder, accessor: c => c.priceSegment },
  { id: 'region', label: 'Geography', buckets: regionOrder, accessor: c => c.region },
  { id: 'client', label: 'Client Segment', buckets: clientOrder, accessor: c => c.clientSegment },
  { id: 'tech', label: 'Tech Depth', buckets: techOrder, accessor: c => c.techCategory },
  { id: 'traffic', label: 'Monthly Traffic', buckets: trafficOrder, accessor: c => c.trafficBucket }
];

// Main component
export default function InfluencerMarketMap() {
  const [viewMode, setViewMode] = useState('scatter');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [filters, setFilters] = useState({
    type: 'all',
    price: 'all',
    region: 'all',
    hasTech: 'all'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [axisY, setAxisY] = useState('price');
  const [proximityMode, setProximityMode] = useState('overall'); // overall, type, price, client, tech
  const networkRef = useRef(null);
  const svgRef = useRef(null);

  // Process companies
  const processedCompanies = useMemo(() => {
    return companiesData.map((c, i) => ({
      ...c,
      id: i,
      simplifiedType: getSimplifiedType(c['Unified Type'] || c.type),
      priceSegment: getPriceSegment(c.pricing),
      region: getRegion(c.geographical_focus),
      hasTech: hasTech(c),
      clientSegment: getClientSegment(c.client_profile),
      techCategory: getTechCategory(c),
      trafficBucket: getTrafficBucket(parseFloat((c['Monthly traffic av 3 month'] || '0').replace(/,/g, '')))
    }));
  }, []);

  // Filter companies
  const filteredCompanies = useMemo(() => {
    return processedCompanies.filter(c => {
      if (filters.type !== 'all' && c.simplifiedType !== filters.type) return false;
      if (filters.price !== 'all' && c.priceSegment !== filters.price) return false;
      if (filters.region !== 'all' && c.region !== filters.region) return false;
      if (filters.hasTech !== 'all') {
        if (filters.hasTech === 'yes' && !c.hasTech) return false;
        if (filters.hasTech === 'no' && c.hasTech) return false;
      }
      if (searchTerm && !c.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    });
  }, [processedCompanies, filters, searchTerm]);

  // Network effect
  useEffect(() => {
    if (viewMode !== 'network' || !networkRef.current) return;

    const width = networkRef.current.clientWidth;
    const height = 750; // Increased height
    d3.select(svgRef.current).selectAll('*').remove();
    const svg = d3.select(svgRef.current).attr('width', width).attr('height', height);

    const grail = processedCompanies.find(c => c.name.toLowerCase().includes('grail')) || processedCompanies[0];
    const mergedMap = new Map([grail, ...filteredCompanies].map(c => [c.id, c]));

    const connectedIds = new Set([grail.id]);
    const links = [];

    const similarity = (a, b) => {
      let score = 0;
      if (proximityMode === 'overall') {
        if (a.simplifiedType === b.simplifiedType) score += 1.2;
        if (a.priceSegment === b.priceSegment) score += 1;
        if (a.region === b.region) score += 0.6;
        if (a.clientSegment === b.clientSegment) score += 0.6;
        if (a.hasTech && b.hasTech) score += 0.4;
      } else if (proximityMode === 'type') {
        if (a.simplifiedType === b.simplifiedType) score += 5;
      } else if (proximityMode === 'price') {
        if (a.priceSegment === b.priceSegment) score += 5;
      } else if (proximityMode === 'client') {
        if (a.clientSegment === b.clientSegment) score += 5;
      } else if (proximityMode === 'tech') {
        if (a.hasTech && b.hasTech) score += 3;
        if (a.techCategory === b.techCategory) score += 2;
      }
      return score;
    };

    const nodes = Array.from(mergedMap.values()).map(c => ({
      ...c,
      radius: c.id === grail.id ? 25 : c.hasTech ? 12 : 8
    }));

    nodes.forEach(n => {
      if (n.id === grail.id) return;
      const score = similarity(grail, n);
      const threshold = proximityMode === 'overall' ? 1.4 : 2;
      if (score >= threshold) {
        links.push({ source: grail.id, target: n.id, weight: score });
        connectedIds.add(n.id);
      }
    });

    // Fix Grail in the center
    const centerNode = nodes.find(n => n.id === grail.id);
    if (centerNode) {
      centerNode.fx = width / 2;
      centerNode.fy = height / 2;
    }

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links)
        .id(d => d.id)
        .distance(l => Math.max(50, 250 - (l.weight * (proximityMode === 'overall' ? 50 : 20))))
        .strength(0.8)
      )
      .force('charge', d3.forceManyBody().strength(d => d.id === grail.id ? -500 : -100))
      .force('collide', d3.forceCollide().radius(d => d.radius + 20).strength(0.8)) // Increased collision for text space
      // Radial force to keep unconnected nodes from flying away too far, but further than connected ones
      .force('radial', d3.forceRadial(d => connectedIds.has(d.id) ? 150 : 400, width / 2, height / 2).strength(0.5));

    svg.append('g')
      .attr('stroke', '#06b6d4') // Cyan color for links
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke-width', l => Math.max(1, (l.weight - 1) * (proximityMode === 'overall' ? 2 : 0.5))) // Thicker lines for stronger similarity
      .attr('stroke-opacity', 0.4);

    const node = svg.append('g')
      .selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('r', d => d.radius)
      .attr('fill', d => d.id === grail.id ? '#00fa9a' : typeColors[d.simplifiedType])
      .attr('stroke', d => d.hasTech ? '#fff' : 'transparent')
      .attr('stroke-width', d => d.id === grail.id ? 3 : 2)
      .style('cursor', 'pointer')
      .style('opacity', d => connectedIds.has(d.id) ? 1 : 0.3) // Dim unconnected nodes
      .on('click', (event, d) => setSelectedCompany(d))
      .call(d3.drag()
        .on('start', (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          // Don't allow moving Grail (it's fixed)
          if (d.id !== grail.id) {
            d.fx = d.x; d.fy = d.y;
          }
        })
        .on('drag', (event, d) => {
          if (d.id !== grail.id) {
            d.fx = event.x; d.fy = event.y;
          }
        })
        .on('end', (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          if (d.id !== grail.id) {
            d.fx = null; d.fy = null;
          }
        }));

    const labels = svg.append('g')
      .selectAll('text')
      .data(nodes)
      .enter()
      .append('text')
      .text(d => d.name.length > 14 ? d.name.substring(0, 12) + '…' : d.name)
      .attr('font-size', '10px')
      .attr('fill', d => connectedIds.has(d.id) ? '#E2E8F0' : '#64748B') // Dim text too
      .attr('text-anchor', 'middle')
      .attr('dy', d => d.radius + 14)
      .style('pointer-events', 'none')
      .style('opacity', d => connectedIds.has(d.id) ? 1 : 0.7);

    simulation.on('tick', () => {
      svg.selectAll('line')
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      // Bound nodes to viewport
      node.attr('cx', d => d.x = Math.max(d.radius + 10, Math.min(width - d.radius - 10, d.x)))
        .attr('cy', d => d.y = Math.max(d.radius + 10, Math.min(height - d.radius - 10, d.y)));

      labels.attr('x', d => d.x)
        .attr('y', d => d.y);
    });

    return () => simulation.stop();
  }, [viewMode, filteredCompanies, processedCompanies, proximityMode]);

  // Group companies by type and price for scatter
  const scatterData = useMemo(() => {
    const types = ['Agency', 'Talent Management', 'Mix', 'Platform'];
    const axis = axisOptions.find(a => a.id === axisY) || axisOptions[0];
    const buckets = [...axis.buckets, 'Other'];

    const grouped = {};
    types.forEach(t => buckets.forEach(b => { grouped[`${t}-${b}`] = []; }));

    filteredCompanies.forEach(c => {
      const raw = axis.accessor(c);
      const bucket = buckets.includes(raw) ? raw : 'Other';
      const key = `${c.simplifiedType}-${bucket}`;
      if (grouped[key]) grouped[key].push(c);
    });

    return { types, buckets, grouped, axisLabel: axis.label };
  }, [filteredCompanies, axisY]);

  // Traffic Data Sort
  const trafficData = useMemo(() => {
    return filteredCompanies
      .filter(c => c['Monthly traffic av 3 month'])
      .sort((a, b) => {
        const aTraffic = parseFloat((a['Monthly traffic av 3 month'] || '0').replace(/,/g, ''));
        const bTraffic = parseFloat((b['Monthly traffic av 3 month'] || '0').replace(/,/g, ''));
        return bTraffic - aTraffic;
      });
  }, [filteredCompanies]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-6" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-emerald-400 to-amber-400 bg-clip-text text-transparent mb-1">
          Influencer Marketing Market Map
        </h1>
        <p className="text-slate-400">
          {filteredCompanies.length} companies • GRAIL Talent Competitive Analysis
        </p>
      </header>

      {/* Controls */}
      <div className="flex flex-col gap-4 mb-6">
        {/* View Toggle */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex gap-2 bg-slate-900/80 rounded-lg p-1 w-fit">
            {[
              { id: 'scatter', label: 'Scatter Plot' },
              { id: 'network', label: 'Network' },
              { id: 'traffic', label: 'Traffic Analysis' },
              { id: 'grid', label: 'Grid' }
            ].map(mode => (
              <button
                key={mode.id}
                onClick={() => setViewMode(mode.id)}
                className={`py-2 px-5 rounded-md font-medium text-sm transition-all ${viewMode === mode.id
                  ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
              >
                {mode.label}
              </button>
            ))}
          </div>

          {viewMode === 'network' && (
            <div className="flex items-center gap-2 bg-slate-900/80 rounded-lg p-1 px-3 border border-slate-700">
              <span className="text-xs text-slate-400 mr-1">Proximity:</span>
              {['overall', 'type', 'price', 'client', 'tech'].map(mode => (
                <button
                  key={mode}
                  onClick={() => setProximityMode(mode)}
                  className={`px-2 py-1 rounded text-xs font-medium transition-all ${proximityMode === mode ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300'
                    }`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap gap-3">
          {viewMode === 'scatter' && (
            <select
              value={axisY}
              onChange={e => setAxisY(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
            >
              {axisOptions.map(opt => (
                <option key={opt.id} value={opt.id}>Y-Axis: {opt.label}</option>
              ))}
            </select>
          )}
          <input
            type="text"
            placeholder="Search company..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 w-48"
          />
          <select
            value={filters.type}
            onChange={e => setFilters(f => ({ ...f, type: e.target.value }))}
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Types</option>
            <option value="Agency">Agency</option>
            <option value="Platform">Platform</option>
            <option value="Talent Management">Talent Management</option>
            <option value="Mix">Mix</option>
          </select>
          <select
            value={filters.price}
            onChange={e => setFilters(f => ({ ...f, price: e.target.value }))}
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Pricing</option>
            <option value="Enterprise">Enterprise ($50K+)</option>
            <option value="Mid-Market">Mid-Market ($10-50K)</option>
            <option value="SMB">SMB ($1K-10K)</option>
            <option value="Freemium">Freemium</option>
            <option value="Custom">Custom/Contact</option>
          </select>
          <select
            value={filters.region}
            onChange={e => setFilters(f => ({ ...f, region: e.target.value }))}
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Regions</option>
            {regionOrder.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <select
            value={filters.hasTech}
            onChange={e => setFilters(f => ({ ...f, hasTech: e.target.value }))}
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Tech</option>
            <option value="yes">Has Technology</option>
            <option value="no">Services Only</option>
          </select>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 mb-4 px-2">
        {Object.entries(typeColors).map(([type, color]) => (
          <div key={type} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-xs text-slate-400">{type}</span>
          </div>
        ))}
        <div className="flex items-center gap-2 pl-4 border-l border-slate-700">
          <div className="w-3 h-3 rounded-full border-2 border-white bg-slate-600" />
          <span className="text-xs text-slate-400">Has Technology</span>
        </div>
      </div>

      {/* Visualization Area */}
      <div className="bg-slate-900/60 rounded-xl border border-slate-800 overflow-hidden">

        {/* SCATTER PLOT */}
        {viewMode === 'scatter' && (
          <div className="p-4">
            {/* Header Row */}
            <div className="flex items-center mb-2">
              <div className="w-28 shrink-0" />
              {scatterData.types.map(type => (
                <div key={type} className="flex-1 text-center">
                  <span className="text-sm font-medium" style={{ color: typeColors[type] }}>{type}</span>
                </div>
              ))}
              <div className="w-28 shrink-0 text-right text-[11px] text-slate-500 pr-2">Y: {scatterData.axisLabel}</div>
            </div>

            {/* Grid Rows */}
            {scatterData.buckets.map((bucket) => (
              <div key={bucket} className="flex border-t border-slate-800 min-h-[100px]">
                {/* Y-axis label */}
                <div className="w-28 shrink-0 flex items-center pr-3">
                  <span className="text-xs text-slate-500 text-right w-full">{bucket}</span>
                </div>

                {/* Cells */}
                {scatterData.types.map((type, typeIdx) => {
                  const key = `${type}-${bucket}`;
                  const companies = scatterData.grouped[key] || [];

                  return (
                    <div
                      key={key}
                      className="flex-1 border-l border-slate-800 p-2 flex flex-wrap content-center justify-center gap-2"
                      style={{ backgroundColor: companies.length > 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}
                    >
                      {companies.map((company) => (
                        <div
                          key={company.id}
                          onClick={() => setSelectedCompany(company)}
                          className="group relative cursor-pointer"
                        >
                          <div
                            className={`w-4 h-4 rounded-full transition-transform hover:scale-150 ${company.hasTech ? 'ring-2 ring-white' : ''}`}
                            style={{ backgroundColor: typeColors[type] }}
                          />
                          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 bg-slate-800 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-30 pointer-events-none shadow-xl border border-slate-700">
                            {company.name}
                          </div>
                        </div>
                      ))}
                      {companies.length === 0 && (
                        <span className="text-slate-700 text-xs">—</span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}

        {/* NETWORK */}
        {viewMode === 'network' && (
          <div className="relative w-full h-[750px] bg-slate-950/50" ref={networkRef}>
            <div className="absolute top-3 left-4 z-10 text-xs text-slate-400 bg-slate-900/50 p-2 rounded backdrop-blur-sm border border-slate-800">
              Ego-graph: center GRAIL, edges = proximity by {proximityMode}
            </div>
            <svg ref={svgRef} className="w-full h-full" />
          </div>
        )}

        {/* TRAFFIC ANALYSIS */}
        {viewMode === 'traffic' && (
          <div className="p-6">
            <h2 className="text-lg font-semibold text-slate-200 mb-4">Monthly Traffic Comparison</h2>
            <div className="space-y-3">
              {trafficData.map(company => {
                const maxTraffic = parseFloat((trafficData[0]?.['Monthly traffic av 3 month'] || '1').replace(/,/g, ''));
                const companyTraffic = parseFloat((company['Monthly traffic av 3 month'] || '0').replace(/,/g, ''));
                const widthPercent = (companyTraffic / maxTraffic) * 100;

                return (
                  <div key={company.id} className="flex items-center gap-3 group cursor-pointer" onClick={() => setSelectedCompany(company)}>
                    <div className="w-32 shrink-0 text-right truncate text-sm text-slate-300 group-hover:text-cyan-400 transition-colors">
                      {company.name}
                    </div>
                    <div className="flex-1 h-8 bg-slate-900/50 rounded-r-md relative overflow-hidden flex items-center">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500/80 to-cyan-500/80 rounded-r-md transition-all duration-500"
                        style={{ width: `${Math.max(widthPercent, 0.5)}%` }}
                      ></div>
                      <span className="absolute left-2 text-xs font-medium text-white drop-shadow-md">
                        {company['Monthly traffic av 3 month'] || 'N/A'}
                      </span>
                    </div>
                    <div className="w-24 shrink-0 text-xs text-slate-500">
                      {company.simplifiedType}
                    </div>
                  </div>
                );
              })}
              {trafficData.length === 0 && (
                <div className="text-center py-10 text-slate-500">
                  No traffic data available.
                </div>
              )}
            </div>
          </div>
        )}

        {/* GRID */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 p-4 max-h-[600px] overflow-y-auto">
            {filteredCompanies.map(company => (
              <div
                key={company.id}
                onClick={() => setSelectedCompany(company)}
                className="bg-slate-800/60 rounded-lg p-4 cursor-pointer hover:bg-slate-800 transition-all border border-slate-700/50 hover:border-slate-600 flex flex-col gap-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-100 text-sm leading-tight pr-2">{company.name}</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      {company.simplifiedType} • {company.priceSegment} • {company.region}
                    </p>
                  </div>
                  <div
                    className={`w-3 h-3 rounded-full shrink-0 ${company.hasTech ? 'ring-2 ring-white' : ''}`}
                    style={{ backgroundColor: typeColors[company.simplifiedType] }}
                  />
                </div>
                <div className="flex flex-wrap gap-2 text-[11px] text-slate-400">
                  <span className="px-2 py-0.5 rounded-full bg-slate-900/60 border border-slate-700">{company.clientSegment}</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-900/60 border border-slate-700">{company.techCategory}</span>
                  {company.hasTech && <span className="px-2 py-0.5 rounded-full bg-emerald-900/40 border border-emerald-700 text-emerald-200">Tech</span>}
                </div>
                <p className="text-xs text-slate-300 line-clamp-2">{company.offer_usp || company.positioning}</p>
                {company.website && (
                  <div className="text-[11px] text-cyan-400 underline truncate">{company.website}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL */}
      {selectedCompany && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedCompany(null)}>
          <div className="bg-slate-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-700" onClick={e => e.stopPropagation()}>

            {/* Modal Header */}
            <div className="sticky top-0 bg-slate-900 border-b border-slate-800 p-5 flex items-start justify-between z-10">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`w-4 h-4 rounded-full ${selectedCompany.hasTech ? 'ring-2 ring-white' : ''}`}
                    style={{ backgroundColor: typeColors[selectedCompany.simplifiedType] }}
                  />
                  <h2 className="text-xl font-bold text-white">{selectedCompany.name}</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-0.5 bg-slate-800 rounded text-xs text-slate-300">{selectedCompany.type}</span>
                  <span className="px-2 py-0.5 bg-slate-800 rounded text-xs text-slate-300">{selectedCompany.priceSegment}</span>
                  <span className="px-2 py-0.5 bg-slate-800 rounded text-xs text-slate-300">{selectedCompany.region}</span>
                  <span className="px-2 py-0.5 bg-slate-800 rounded text-xs text-slate-300">{selectedCompany.clientSegment}</span>
                  <span className="px-2 py-0.5 bg-slate-800 rounded text-xs text-slate-300">{selectedCompany.techCategory}</span>
                  <span className="px-2 py-0.5 bg-slate-800 rounded text-xs text-slate-300">
                    Traffic: {selectedCompany['Monthly traffic av 3 month'] || 'N/A'}
                  </span>
                </div>
              </div>
              <button onClick={() => setSelectedCompany(null)} className="text-slate-400 hover:text-white text-2xl p-2 -m-2">×</button>
            </div>

            {/* Modal Content */}
            <div className="p-5 space-y-5">
              {/* USP */}
              <div className="bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 rounded-lg p-4 border border-cyan-500/20">
                <h3 className="text-cyan-400 font-semibold text-sm mb-1">💡 Unique Selling Proposition</h3>
                <p className="text-slate-200 text-sm">{selectedCompany.offer_usp}</p>
              </div>

              {/* Two columns */}
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-4">
                  <InfoBlock title="🌐 Website" content={
                    selectedCompany.website && selectedCompany.website !== 'Not provided' ? (
                      <a href={selectedCompany.website} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline break-all text-sm">
                        {selectedCompany.website}
                      </a>
                    ) : null
                  } />
                  <InfoBlock title="💰 Business Model" content={selectedCompany.business_model} />
                  <InfoBlock title="💵 Pricing" content={selectedCompany.pricing} />
                  <InfoBlock title="🎯 Positioning" content={selectedCompany.positioning} />
                </div>
                <div className="space-y-4">
                  <InfoBlock title="👥 Client Profile" content={selectedCompany.client_profile} />
                  <InfoBlock title="🌍 Geography" content={selectedCompany.geographical_focus} />
                  <InfoBlock title="📱 Social Media" content={selectedCompany.social_media_links} />
                  <InfoBlock title="📈 Traffic" content={selectedCompany.trafficBucket} />
                </div>
              </div>

              {/* Sales Points */}
              <InfoBlock title="⚡ Sales Points" content={selectedCompany.sales_points} />
              <InfoBlock title="📣 Marketing Strategy" content={selectedCompany.marketing_strategy} />
              <InfoBlock title="🗺 Content Strategy" content={selectedCompany.content_strategy_analysis} />
              <InfoBlock title="📊 Social Results" content={selectedCompany.social_results} />

              {/* Technology */}
              {selectedCompany.hasTech && (
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                  <h3 className="text-violet-400 font-semibold text-sm mb-2">🔧 Technology</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-slate-500">Platform:</span>
                      <span className="text-slate-200 ml-2">{selectedCompany.technology_offering}</span>
                    </div>
                    {selectedCompany.technology_functions && selectedCompany.technology_functions !== 'N/A' && (
                      <div>
                        <span className="text-slate-500">Functions:</span>
                        <span className="text-slate-200 ml-2">{selectedCompany.technology_functions}</span>
                      </div>
                    )}
                    {selectedCompany.integrations && selectedCompany.integrations !== 'N/A' && (
                      <div>
                        <span className="text-slate-500">Integrations:</span>
                        <span className="text-slate-200 ml-2">{selectedCompany.integrations}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <InfoBlock title="📌 Other Info" content={selectedCompany.other_info} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoBlock({ title, content }) {
  if (!content || content === 'N/A' || content === 'Not provided' || content === 'Not disclosed') return null;
  return (
    <div>
      <h4 className="text-slate-500 text-xs font-medium mb-1">{title}</h4>
      <div className="text-slate-200 text-sm">{typeof content === 'string' ? content : content}</div>
    </div>
  );
}
