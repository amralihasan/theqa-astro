import type { Post } from '../types/Post';

interface ApiPageResponse {
  data: {
    id: number;
    url: string;
    name: string;
    description: string;
    content: string;
    updated_at?: string;
  };
  meta: {
    title: string;
    description: string;
  };
}

export async function fetchPostFromAPI(): Promise<Post | null> {
  try {
    // Get environment variables
    const baseUrl = import.meta.env.PUBLIC_API_BASE_URL;
    const apiHash = import.meta.env.PUBLIC_API_HASH;
    const authToken = import.meta.env.API_AUTH_TOKEN;
    const pageSlug = import.meta.env.PUBLIC_API_PAGE_SLUG;

    if (!baseUrl || !apiHash || !authToken || !pageSlug) {
      throw new Error('Missing required environment variables');
    }

    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("X-API-Hash", apiHash);
    myHeaders.append("Authorization", `Basic ${authToken}`);

    const requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
    };

    const apiUrl = `${baseUrl}/page/${pageSlug}`;
    console.log('Fetching from URL:', apiUrl);
    
    const response = await fetch(apiUrl, requestOptions);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiPageResponse = await response.json();
    
    console.log('=== API DEBUG INFO ===');
    console.log('Full API Response:', JSON.stringify(result, null, 2));
    console.log('API data.url field:', result.data.url);
    console.log('Expected route: /posts/licensed-trading-companies-saudi');
    console.log('====================');
    
    // Transform API response to our Post interface
    const post: Post = {
      id: result.data.id || 1,
      title: result.data.name || "شركات تداول مرخصة في السعودية",
      content: result.data.content || fallbackPost.content,
      slug: result.data.url || "شركات-تداول-مرخصة-في-السعودية",
      publishedAt: result.data.updated_at ? new Date(result.data.updated_at) : new Date("2024-02-01"),
      excerpt: result.data.description || "دليل شامل لأفضل شركات التداول المرخصة في المملكة العربية السعودية."
    };

    console.log('=== PROCESSED POST DEBUG ===');
    console.log('Generated slug:', post.slug);
    console.log('Title:', post.title);
    console.log('Content length:', post.content.length);
    console.log('============================');
    
    return post;
  } catch (error) {
    console.error("Error fetching post from API:", error);
    return null;
  }
}

// Fallback post in case API fails
export const fallbackPost: Post = {
  id: 1,
  title: "شركات تداول مرخصة في السعودية",
  content: `# شركات تداول مرخصة في السعودية

## مقدمة

تعتبر المملكة العربية السعودية من أكبر الأسواق المالية في منطقة الشرق الأوسط، وتضم العديد من شركات التداول المرخصة والموثوقة التي تقدم خدمات متميزة للمستثمرين.

## أفضل شركات التداول المرخصة

### الشركات المحلية المرخصة
- شركة الراجحي المالية
- شركة الإنماء للاستثمار
- شركة الرياض المالية
- شركة الأهلي كابيتال

### الشركات العالمية المرخصة
- XTB
- AvaTrade
- Exness
- Plus500

## معايير اختيار الشركة المناسبة

### 1. التراخيص والتنظيم
- ترخيص من هيئة السوق المالية السعودية
- عضوية في صندوق حماية المستثمرين
- امتثال للمعايير الدولية

### 2. الخدمات المقدمة
- منصات تداول متقدمة
- تنوع الأدوات المالية
- دعم العملاء باللغة العربية
- التحليل الفني والأساسي

### 3. الرسوم والعمولات
- عمولات تنافسية
- شفافية في هيكل الرسوم
- عدم وجود رسوم خفية

## نصائح للاختيار الصحيح

1. **تأكد من التراخيص**: تحقق من ترخيص الشركة من الجهات المختصة
2. **اقرأ الشروط والأحكام**: فهم جميع البنود قبل فتح الحساب
3. **جرب الحساب التجريبي**: اختبر منصة التداول قبل الاستثمار الفعلي
4. **قارن بين الشركات**: لا تتسرع في اتخاذ القرار

## الخلاصة

اختيار شركة التداول المناسبة خطوة مهمة في رحلة الاستثمار. تأكد من اختيار شركة مرخصة وموثوقة تلبي احتياجاتك الاستثمارية.`,
  slug: "شركات-تداول-مرخصة-في-السعودية",
  publishedAt: new Date("2024-02-01"),
  excerpt: "دليل شامل لأفضل شركات التداول المرخصة في المملكة العربية السعودية ومعايير اختيار الشركة المناسبة."
};