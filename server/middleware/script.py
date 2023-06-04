from bs4 import BeautifulSoup


def extract_javascript():
    try:
        file = open("templates/index.html", encoding="utf8")
        html_content = file.read()
        soup = BeautifulSoup(html_content, 'html.parser')
        script_tags = soup.find_all('script')
        javascript_code = []
        for script in script_tags:
            if script.string:
                javascript_code.append(script.string.strip())
        return javascript_code
    except:
        print("Could not extract javascript")


extract_javascript()
