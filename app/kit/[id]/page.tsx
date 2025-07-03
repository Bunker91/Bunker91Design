export default function KitPage({ params }: { params: { id: string } }) {
  return (
    <main className="text-white p-10">
      <h1 className="text-2xl font-bold">Detalhes do Kit {params.id}</h1>
      <p>Conteúdo do kit...</p>
    </main>
  )
}
