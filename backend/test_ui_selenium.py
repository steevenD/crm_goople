from selenium import webdriver
import chromedriver_binary  # Adds chromedriver binary to path
import names
import time
from selenium.webdriver.support.ui import Select
import random

browser = webdriver.Chrome(executable_path=r".\chromedriver.exe")
browser.get("http://localhost:4200")

name = names.get_first_name() + "_" + names.get_last_name()

def launch_test():
    register_button = browser.find_element_by_xpath("//*[@id='navbarCollapse']/links/ul[2]/li[2]/a")
    register_button.click()
    register()

def register():
    forms_register = browser.find_elements_by_css_selector(".form-control")
    forms_register[0].send_keys(name)
    forms_register[1].send_keys(name + "@gmail.com")
    forms_register[2].send_keys('PasswordComplique12@')
    forms_register[3].send_keys('PasswordComplique12@')

    button_register = browser.find_elements_by_css_selector("body > app-root > div > app-register > div > div > button")[0]
    button_register.click()

    if verify_url_change('http://localhost:4200/login'):
        login()

def login():
    forms_login = browser.find_elements_by_css_selector(".form-control")
    forms_login[0].send_keys(name)
    forms_login[1].send_keys("PasswordComplique12@")

    button_login = browser.find_elements_by_css_selector("body > app-root > div > app-login > div > div > button")[0]
    button_login.click()
    if verify_url_change('http://localhost:4200/salesShares'):
        add_sale_state()

def add_sale_state():
    button_add_sale_share = browser.find_elements_by_css_selector("body > app-root > div > app-sales-shares > app-sales-tab > div > div:nth-child(1) > app-add-sales > button")[0]
    button_add_sale_share.click()
    time.sleep(2)
    forms_add_sale_share = browser.find_elements_by_css_selector(".form-control")
    forms_add_sale_share[0].send_keys("My Digital School")
    forms_add_sale_share[1].send_keys("Alexandra")
    forms_add_sale_share[2].send_keys("Du four")
    forms_add_sale_share[3].send_keys("09/12/2019")
    select_state = Select(browser.find_elements_by_css_selector('#frameModalTop > div > div > div.modal-body.mx-3 > div > div.w-50.mr-20 > select')[0])
    select_state.select_by_value('ABANDONMENT')
    forms_add_sale_share[4].send_keys("120000")
    select_status = Select(browser.find_elements_by_css_selector('#frameModalTop > div > div > div.modal-body.mx-3 > div > div.w-50.ml-20.right-part > select')[0])
    select_status.select_by_value('LOUNGE')
    forms_add_sale_share[5].send_keys("Magnifique école d'informatique Rennaise située dans le campus de Ker lann")
    select_action = Select(browser.find_elements_by_css_selector('#frameModalTop > div > div > div.modal-body.mx-3 > div > div.w-50.ml-20.right-part > select')[1])
    select_action.select_by_value('FINISH')
    button_add_sale = browser.find_elements_by_css_selector("#frameModalTop > div > div > div.modal-footer.d-flex.justify-content-center > button")[0]
    time.sleep(5)
    button_add_sale.click()
    time.sleep(2)

    update_sale_share()

def update_sale_share():
    forms_update_sale_share = browser.find_elements_by_css_selector(".form-control")
    forms_update_sale_share[6].clear()
    forms_update_sale_share[6].send_keys("My School")
    forms_update_sale_share[7].clear()
    forms_update_sale_share[7].send_keys(names.get_last_name())
    forms_update_sale_share[10].clear()
    forms_update_sale_share[10].send_keys('erTe')
    forms_update_sale_share[10].clear()
    forms_update_sale_share[10].send_keys(random.randrange(1250, 10000))

    delete_sale_share()

def delete_sale_share():
    button_delete_sale = browser.find_elements_by_css_selector("#table > table > tr:nth-child(2) > td:nth-child(11) > mdb-icon")[0]
    button_delete_sale.click()
    time.sleep(5)

    redirect_kpi()
    
def redirect_kpi():
    button_kpi = browser.find_elements_by_css_selector("#navbarCollapse > links > ul.navbar-nav.mr-auto > li:nth-child(2)")[0]
    button_kpi.click()
    time.sleep(5)

    update_goal()

def update_goal():
        forms = browser.find_elements_by_tag_name("input")
        forms[0].clear()
        forms[0].send_keys("1234")
        time.sleep(3)
        forms[1].clear()
        forms[1].send_keys("80")
        browser.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(3)

        logout()

def logout():
    button_logout = browser.find_elements_by_css_selector("#navbarCollapse > links > ul:nth-child(2) > li")[0]
    button_logout.click();

def verify_url_change(url):
    while browser.current_url != url:
            time.sleep(2)
            if browser.current_url == url:
                return True

launch_test()
