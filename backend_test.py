
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
        url = f"{self.base_url}/api/{endpoint}"
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
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    print(f"Response: {response.json()}")
                except:
                    print(f"Response: {response.text}")

            return success, response.json() if success and response.content else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_login(self, username, password):
        """Test login endpoint"""
        success, response = self.run_test(
            "Login",
            "POST",
            "login",
            200,
            data={"username": username, "password": password}
        )
        if success and 'token' in response:
            self.token = response['token']
            return True
        else:
            print("❌ Login failed or not implemented, continuing without authentication")
            return False

    def test_api_root(self):
        """Test API root endpoint"""
        return self.run_test(
            "API Root",
            "GET",
            "",
            200
        )

    def test_status(self):
        """Test status endpoint"""
        return self.run_test(
            "Status Check",
            "GET",
            "status",
            200
        )

    def test_create_status(self):
        """Test creating a status"""
        return self.run_test(
            "Create Status Check",
            "POST",
            "status",
            200,
            data={"status": "ok"}
        )

    def test_schedule_endpoints(self):
        """Test schedule-related endpoints"""
        # Test getting all sessions
        success, response = self.run_test(
            "Get All Sessions",
            "GET",
            "sessions",
            200
        )
        
        # Test creating a session
        session_data = {
            "student": "Test Student",
            "day": "Monday",
            "time": "10:00 AM",
            "type": "individual",
            "color": "#3B82F6"
        }
        success, response = self.run_test(
            "Create Session",
            "POST",
            "sessions",
            201,
            data=session_data
        )
        
        # If session creation succeeded, test updating and deleting it
        if success and 'id' in response:
            session_id = response['id']
            
            # Test updating the session
            update_data = {
                "student": "Updated Student",
                "day": "Tuesday",
                "time": "11:00 AM"
            }
            self.run_test(
                "Update Session",
                "PUT",
                f"sessions/{session_id}",
                200,
                data=update_data
            )
            
            # Test deleting the session
            self.run_test(
                "Delete Session",
                "DELETE",
                f"sessions/{session_id}",
                200
            )
        
        return success

def main():
    print("\n===== Testing Achieve API Basic Functionality =====\n")
    
    # Setup
    tester = AchieveAPITester()
    
    # Run tests
    tester.test_api_root()
    tester.test_status()
    tester.test_create_status()
    
    # Test login (may not be implemented)
    tester.test_login("admin", "password")
    
    # Test schedule-related endpoints (may not be implemented)
    # tester.test_schedule_endpoints()
    
    # Print results
    print(f"\n📊 Tests passed: {tester.tests_passed}/{tester.tests_run}")
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())
