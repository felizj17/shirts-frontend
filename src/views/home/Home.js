import Feed from "../../components/tweets/Feed"
export default function Home({signedIn}) {
  return (
    <div className='home-page'>
      {signedIn ? (
        <section>
          <Feed user={signedIn} />
        </section>
      ) : null}
    </div>
  )
}
