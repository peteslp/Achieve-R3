
import requests
import sys
import json
from datetime import datetime

class AchieveAPITester:
    def __init__(self, base_url="https://88e5d6a6-a172-4bf7-af09-0703f927e55b.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}
        
        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    return success, response.json()
                except:
                    return success, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    print(f"Response: {response.text}")
                    return False, response.json()
                except:
                    return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_server_health(self):
        """Test if the server is running"""
        success, _ = self.run_test(
            "Server Health Check",
            "GET",
            "api/health",
            200
        )
        return success
    
    def test_root_endpoint(self):
        """Test the root API endpoint"""
        success, _ = self.run_test(
            "Root API Endpoint",
            "GET",
            "api/",
            200
        )
        return success
    
    def test_status_endpoint(self):
        """Test the status endpoint"""
        success, _ = self.run_test(
            "Status Endpoint",
            "POST",
            "api/status",
            200,
            data={"client_name": "Test Client"}
        )
        return success
    
    def test_get_status_checks(self):
        """Test getting status checks"""
        success, _ = self.run_test(
            "Get Status Checks",
            "GET",
            "api/status",
            200
        )
        return success

def main():
    # Setup
    tester = AchieveAPITester()
    
    # Test server health
    if not tester.test_server_health():
        print("❌ Server health check failed, stopping tests")
    else:
        print("✅ Server is running")
        
        # Test other endpoints
        tester.test_root_endpoint()
        tester.test_status_endpoint()
        tester.test_get_status_checks()

    # Print results
    print(f"\n📊 Tests passed: {tester.tests_passed}/{tester.tests_run}")
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())
