
import requests
import sys
from datetime import datetime, timedelta

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
        print(f"URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers)

            print(f"Status Code: {response.status_code}")
            
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

    def test_login(self, email="test@example.com", password="password123"):
        """Test login and get token"""
        success, response = self.run_test(
            "Login",
            "POST",
            "api/login",
            200,
            data={"email": email, "password": password}
        )
        if success and 'token' in response:
            self.token = response['token']
            return True
        return False

    def test_api_root(self):
        """Test the API root endpoint"""
        success, response = self.run_test(
            "API Root",
            "GET",
            "api/",
            200
        )
        return success, response

    def test_status_check(self):
        """Test the status check endpoint"""
        success, response = self.run_test(
            "Status Check",
            "GET",
            "api/status",
            200
        )
        return success, response

    def test_create_status_check(self, client_name="Test Client"):
        """Test creating a status check"""
        success, response = self.run_test(
            "Create Status Check",
            "POST",
            "api/status",
            200,
            data={"client_name": client_name}
        )
        return success, response

def main():
    # Setup
    tester = AchieveAPITester()
    
    # Run tests
    print("\n===== Testing Achieve API Basic Functionality =====\n")
    
    # Test API root
    api_root_success, api_root_response = tester.test_api_root()
    
    # Test status check
    status_check_success, status_check_response = tester.test_status_check()
    
    # Test creating a status check
    create_status_success, create_status_response = tester.test_create_status_check()
    
    # Test login (may not be implemented)
    login_success = tester.test_login()
    if not login_success:
        print("❌ Login failed or not implemented, continuing without authentication")
    
    # Print results
    print(f"\n📊 Tests passed: {tester.tests_passed}/{tester.tests_run}")
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())
