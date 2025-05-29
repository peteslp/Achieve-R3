import requests
import sys
from datetime import datetime

class AchieveAPITester:
    def __init__(self, base_url="https://88e5d6a6-a172-4bf7-af09-0703f927e55b.preview.emergentagent.com"):
        self.base_url = base_url
        self.token = None
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, data=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}
        if self.token:
            headers['Authorization'] = f'Bearer {self.token}'

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                if response.text:
                    try:
                        return success, response.json()
                    except:
                        return success, response.text
                return success, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"Response: {response.text}")
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_login(self, username, password):
        """Test login and get token"""
        success, response = self.run_test(
            "Login",
            "POST",
            "api/login",
            200,
            data={"username": username, "password": password}
        )
        if success and 'token' in response:
            self.token = response['token']
            return True
        return False

    def test_get_sessions(self):
        """Test getting sessions"""
        success, response = self.run_test(
            "Get Sessions",
            "GET",
            "api/sessions",
            200
        )
        return success, response

def main():
    # Setup
    tester = AchieveAPITester()
    
    # Test login
    login_success = tester.test_login("test@example.com", "password123")
    if not login_success:
        print("❌ Login failed or not implemented, continuing without authentication")
    
    # Test getting sessions
    sessions_success, sessions_data = tester.test_get_sessions()
    if sessions_success:
        print(f"✅ Successfully retrieved sessions")
        print(f"Sessions data: {sessions_data}")
    else:
        print("❌ Failed to retrieve sessions or endpoint not implemented")
    
    # Print results
    print(f"\n📊 Tests passed: {tester.tests_passed}/{tester.tests_run}")
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())