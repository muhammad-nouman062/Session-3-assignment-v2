import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

# 1. Setup direct Chrome settings to bypass version checking freezes
options = Options()
options.add_argument("--headless")  # Runs in background to prevent Windows process hanging
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")

# 2. Initialize Chrome directly using native Selenium 4+ handling
driver = webdriver.Chrome(options=options)

try:
    print("Navigating to the login page...")
    # 3. Open the website testing link
    driver.get("https://the-internet.herokuapp.com/login")
    time.sleep(2)

    # 4. Complete the form using clean selectors
    driver.find_element(By.ID, "username").send_keys("tomsmith")
    driver.find_element(By.ID, "password").send_keys("SuperSecretPassword!")
    
    # 5. Click the Login submit button
    driver.find_element(By.CSS_SELECTOR, 'button[type="submit"]').click()
    time.sleep(2)

    # 6. Automated Assertions (Verifying the green banner text)
    success_message = driver.find_element(By.CSS_SELECTOR, ".flash.success").text
    assert "You logged into a secure area!" in success_message
    print("Test Passed: Successfully logged in and verified the secure banner!")

    # 7. Click the Logout button to clean up the flow
    driver.find_element(By.CSS_SELECTOR, "a[href='/logout']").click()
    print("Test Passed: Successfully logged out!")

except AssertionError:
    print("Test Failed: The expected success banner text was not found.")
except Exception as e:
    print(f"An error occurred during test execution: {e}")
finally:
    # 8. Close the browser cleanly at the end of the test
    driver.quit()