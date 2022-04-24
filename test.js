// https://www.omdbapi.com/?apikey=6a41ddca&s=om_shanti_om
let id;
    let movies_div=document.getElementById("movies")
    async function searchMovies(){
        // https://www.omdbapi.com/?apikey=80d26494&s=om_shanti_om
            // https://www.omdbapi.com/?apikey=6a41ddca&s=om_shanti_om
            movies_div.style.display="block"
            try {

            const query=document.getElementById("query").value
            const res=await fetch(`https://www.omdbapi.com/?apikey=80d26494&s=${query}`)
            const data=await res.json();
            const movies=data.Search;
            // appendMovies(movies);
            // console.log("data:", data);

            return movies;

        }catch(err){
            console.log("err:",err);

        }
    }
    function appendMovies(data){
        //optimization #1
        if(data===undefined){
            return false;
        }
        //obtimixation #2
        movies_div.innerHTML=null;
        data.forEach(function(el){
            let p=document.createElement("p");
            p.className="nameMovie"
            p.innerText=el.Title;
            movies_div.append(p)
            p.onclick=function(){
                movieDetails(el)
            }
        });
    }
    // 1. we will assemble them in one function
    async function main(){
        let data=await searchMovies();
        if(data===undefined){
            movies_div.style.display="none"
            return false;
        }
        // console.log("data:",data)
        appendMovies(data);
    }
    //2. debouncing

    function debounce(func,delay){
        if(id){
            clearTimeout(id)
        }
        id=setTimeout(function(){
            func();
        },delay)
    }


    //find details "hotstar 2 assigment"
    async function movieDetails(name){
        const n= await fetch(`https://www.omdbapi.com/?apikey=80d26494&t=${name.Title}`)
        const data = await n.json();
        console.log("name:",data)
        appendDetails(data)
    }

    function appendDetails(data){
        const details=document.getElementById("details")
        details.innerHTML=null;
        let div=document.createElement("div")
        let title=document.createElement("h1")
        title.innerText=`Title: ${data.Title}`;
        let poster=document.createElement("img")
        poster.src=data.Poster;
        let actors=document.createElement("p")
        actors.innerText=`actors: ${data.Actors}`;
        let rating=document.createElement("p")
        rating.innerText=`imdb rating: ${data.imdbRating}`;
        let rel=document.createElement("p")
        rel.innerText=`date of release : ${data.Released}`;
        div.append(title,poster,actors,rating,rel)
        details.append(div)

        // {Title,Actors,Poster,imdbRating,Year,Released}
    }