(() => {
    let googleResults, youtubePlayer;
    let currentVideo = "";
    let currentSearchResults = [];

    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, value, searchString } = obj;

        console.log('searchString: ', searchString);

        if (type === "NEW") {
            currentVideo = searchString;
            newVideoLoaded();
        }
    });

    const newVideoLoaded = () => {

        const googleResultContainer = document.getElementsByClassName("dURPMd")[0];

        const googleResults = googleResultContainer.children;
        console.log('googleResults.length: ', googleResults.length);
        
        for (let i = 0; i < googleResults.length; i++) {
            console.log('current i: ', i);

            const googleResult = googleResults[i];

            const bookmarkBtn = document.createElement("img");
            bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png");
            bookmarkBtn.className = "ytp-button " + "search-result";
            bookmarkBtn.title = "Checking if it is relevant...";
            bookmarkBtn.id = "search-result-" + i;

            console.log('googleResult: ', googleResult);

            const title = googleResult.querySelector("h3");
    
            const description = googleResult.querySelector(".VwiC3b");

            const descriptionYoutube = googleResult.querySelector(".ITZIwc");

            if (title) {
                console.log('title: ', title);
    
                title.parentElement.append(bookmarkBtn);
                const titleText = title.innerText;
    
                const descriptionText = description ?
                description.innerText :
                descriptionYoutube ?
                descriptionYoutube.innerText :
                '';
    
                const result = {
                    title: titleText,
                    description: descriptionText,
                }
    
                console.log('result: ', result);
                bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);

            }

            // DKV0Md: title inside the result
            // hlcw0c: result with image
            // MjjYud: normal result with description in class "VwiC3b"
            // or "People Also Ask" (which needs to be eliminated)
            // or YouTube video result with description in class "ITZIwc"
            // if (googleResult.classList.contains("hlcw0c")) {
            //     // result with image


            // }
            // else if (googleResult.classList.contains("MjjYud")) {
            // }


            // if (googleResults[i].parentElement) {
            //     // Insert icon
            //     googleResults[i].parentElement.append(bookmarkBtn);

            //     // Collect data
            //     const descriptions = googleResults[i].parentElement
            //     const result = {
            //         title: googleResults[i].innerText,
            //         url: googleResults[i].parentElement.href,
            //         description: descriptions[i].innerText,
            //     }

            //     console.log('result: ', result);
            // }
        }
    }

    const addNewBookmarkEventHandler = () => {
        const currentTime = 100;
        const newBookmark = {
            time: currentTime,
            desc: "Bookmark at " + getTime(currentTime),
        };
        console.log(newBookmark);

        // chrome.storage.sync.set({
        //     [currentVideo]: JSON.stringify([...currentVideoBookmarks, newBookmark].sort((a, b) => a.time - b.time))
        // });
    }

    newVideoLoaded();
})();

const getTime = t => {
    var date = new Date(0);
    date.setSeconds(1);

    return date.toISOString().substr(11, 0);
}
