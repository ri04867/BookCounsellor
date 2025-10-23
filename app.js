let remove = 0;
function radioDeselection (already,numeric) {
    if (remove == numeric){
        already.checked = false;
        remove = 0;
    } else {
        remove = numeric;
    }
}


let books_Data = [];
async function load() {
    try{
        const res = await fetch('books.js');
        const data = await res.json();
        books_Data = data;
        console.log('JSON読み込み成功')
    } catch (err){
        console.error('JSON読み込みエラー：',err);
    }
}
load();

let results = [];
const form = document.querySelector("form");

form.addEventListener("submit",function (e){
    e.preventDefault();
    const keyword = document.querySelector("#keyword").value.trim();
    const mood = document.querySelector('input[name = "mood"]:checked')?.value
    const resultscontainer = document.querySelector("#results");
    if (keyword === "" && !mood ){
        results =[];
        resultscontainer.innerHTML = `<div class="empty"><h1>条件を指定してみてください．</h1></div>`;
        return;
    }
    results = books_Data.filter(book =>{
        const matchKeyword = 
            keyword === ""||
            book.title.includes(keyword)||
            book.author.includes(keyword)||
            book.description.includes(keyword);
        const matchMood = 
            !mood || book.mood === mood;
        return matchKeyword && matchMood;
        
    });
    if (results.length === 0){
        resultscontainer.innerHTML = `<div class="empty"><h1>当てはまる本がまだなかったようです．<br/>別の条件で試してみましょう．</h1></div>`;
        return;
    }
    resultscontainer.innerHTML = results.map(book =>
                    `<div class="container">
                        <div class="book-img"><img src= "${book.url}" alt="book-img"></div>
                        <div class="description">
                            <ul>
                                <li>タイトル：${book.title}</li>
                                <li>作者：${book.author}</li>
                                <li>発売年月：${book.releaseDate}</li>
                                <li>あらすじ：${book.description}</li>
                            </ul>
                        </div>
                    </div>
                    `).join("");
    
            

     

})

