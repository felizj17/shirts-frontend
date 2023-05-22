import Feed from "../../components/shorts/Feed"
export default function Home({user}) {
  return (
    <div className='home-page'>
      {user ? (
        <section>
          <Feed user={user} />
        </section>
      ) : null}
    </div>
  )
}
