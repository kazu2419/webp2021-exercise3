import { useEffect, useState } from "react";
import { fetchImages } from "./api";

function Header() {
    return (
      <header className="hero is-info is-bold is-medium">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-size-1 has-text-centered">キャラクター別Amiiboまとめ</h1>
            <p>日本大学文理学部　情報科学科2年　5420050番　土橋一斗</p>
          </div>
        </div>
      </header>
    );
  }
  
  function Image(props) {
    return (
      <div className="card">
        <div className="card-image">
          <figure className="image">
          <img src={props.src} alt="Amiibo"/>
          </figure>
        </div>
      </div>
    );
  }

  function Loading() {
    return <p>PLEASE WAIT...</p>;
  }  
  
  function Gallery(props) {
    const { urls } = props;
    if (urls == null) {
        return <Loading />;
    }
    return (
      <div className="columns is-vcentered is-multiline">
        {urls.map((url) => {
          return (
            <div key={url} className="column is-4">
              <Image src={url} />
            </div>
          );
        })}
      </div>
    );
  }

  function Form(props) {
    function handleSubmit(event) {
      event.preventDefault();
      const { name } = event.target.elements;
      props.onFormSubmit(name.value);
    }
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="field has-addons">
            <div className="control is-expanded">
              <div className="select is-fullwidth">
                <select name="name" defaultValue="Mario">
                  <option value="Mario">マリオ</option>
                  <option value="Luigi">ルイージ</option>
                  <option value="Peach">ピーチ</option>
                  <option value="Yoshi">ヨッシー</option>
                  <option value="Bowser">クッパ</option>
                  <option value="Wario">ワリオ</option>
                  <option value="Waluigi">ワルイージ</option>
                  <option value="Daisy">デイジー</option>
                  <option value="Donkey Kong">ドンキーコング</option>
                  <option value="Diddy Kong">ディディーコング</option>
                </select>
              </div>
            </div>
            <div className="control">
              <button type="submit" className="button is-danger is-rounded">
                change character
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }  
  
  function Main() {
    const [urls, setUrls] = useState(null);

    useEffect(() => {
      fetchImages("Mario").then((urls) => {
        setUrls(urls);
      });
    }, []);

    function reloadImages(name) {
      fetchImages(name).then((urls) => {
        setUrls(urls);
      });
    }

    return (
      <main>
        <section className="section">
          <div className="container">
            <Form onFormSubmit={reloadImages} />
          </div>
        </section>
        <section className="section">
          <div className="container">
            <Gallery urls={urls} />
          </div>
        </section>
      </main>
    );
  }
  
  function Footer() {
    return (
      <footer className="footer">
        <div className="content has-text-centered">
          <p>これらAmiiboの画像データは，AmiiboAPIから取得し使用しています．</p>
          <p>
            <a href="https://www.amiiboapi.com/">Donate to AmiiboAPI</a>
          </p>
          <p>このサイトは日本大学文理学部情報科学科 Webプログラミングの演習課題によって作成したものです．</p>
        </div>
      </footer>
    );
  }
  
  function App() {
    return (
      <div>
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
  
  export default App;