from flask import jsonify
from controllers import htmlTree, images, links, text, script, seo


def data():
    try:
        path = "./templates/index.html"
        img = images.extract_images(path)
        a = links.extract_links(path)
        txt = text.extract_text(path)
        js = script.extract_javascript(path)
        tree = htmlTree.create_html_tree(path)
        (keywords, good, bad) = seo.seo_analysis(path)
        return ({
            "success": True,
            "message": "done",
            "images": img,
            "links": a,
            "text": txt,
            "script": js,
            "graph": tree,
            "good": good,
            "bad": bad,
            "keywords": keywords
        })
    except Exception:
        print("Error occurred while extracting")
        return ({
            "success": False,
            "message": "Error occurred while extracting"
        })


data()
