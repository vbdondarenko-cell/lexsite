export function PageHero({ kicker, title, lead }: { kicker?: string; title: string; lead?: string }) {
  return (
    <section className="on-dark bg-graphite text-ivory">
      <div className="wrap py-24 lg:py-36">
        {kicker && <p className="kicker reveal mb-8">{kicker}</p>}
        <h1 className="serif reveal max-w-[18ch] text-[length:var(--text-h1)]">{title}</h1>
        {lead && <p className="reveal mt-8 max-w-2xl text-lg text-mist">{lead}</p>}
      </div>
    </section>
  );
}
