from bs4 import BeautifulSoup


def extract_images():
    try:
        file = open("templates/index.html", encoding="utf8")
        html_content = file.read()
        soup = BeautifulSoup(html_content, 'html.parser')
        img_tags = soup.find_all('img')
        image_urls = []
        for img in img_tags:
            src = img.get('src')
            image = []
            if src:
                image.append(src)
                image.append(img.get('alt'))
            if len(image):
                image_urls.append(image)
        return image_urls
    except:
        print("Error occured while loading images")
        return None


extract_images()
