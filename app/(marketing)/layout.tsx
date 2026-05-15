import Nav from '@/components/Nav'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link
        rel="preload"
        href="/assets/home-preloader.mp4"
        as="fetch"
        type="video/mp4"
        crossOrigin="anonymous"
      />
      <Nav />
      {children}
    </>
  )
}
