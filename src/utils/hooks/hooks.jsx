import React from "react"


export function usePageNumber(prevPage, nextPage) {
    if (prevPage && nextPage) {
        const pageRef = nextPage.match(/page=([^&]+)/g)
        const pageNum = pageRef[0].slice(pageRef[0].indexOf("=") + 1)
        return parseInt(pageNum) - 1
    } else if (prevPage && nextPage === null) {
        const pageRef = prevPage.match(/page=([^&]+)/g)
        if (pageRef) {
            const pageNum = pageRef[0].slice(pageRef[0].indexOf("=") + 1)
            return parseInt(pageNum) + 1
        } else {
            return 2
        }
    }
    return 1
}


export function useScrollFetch({hasNextPage, fetchNextPage}) {
    const [isScrollFetching, setIsScrollFetching] = React.useState(false)

    React.useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    React.useEffect(() => {
        if (isScrollFetching && hasNextPage) {
            fetchNextPage()
        }
    }, [isScrollFetching, fetchNextPage, hasNextPage])

    function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) {
            return;
        }
        setIsScrollFetching(true)
    }

    return [setIsScrollFetching]
}