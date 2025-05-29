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

    def test_get_sessions(self):
        """Test getting all sessions"""
        success, response = self.run_test(
            "Get All Sessions",
            "GET",
            "api/sessions",
            200
        )
        if success:
            try:
                if isinstance(response, list):
                    print(f"Found {len(response)} sessions")
                else:
                    print(f"Response is not a list: {response}")
            except:
                print(f"Could not determine session count: {response}")
        return success, response

    def test_get_session_by_id(self, session_id):
        """Test getting a session by ID"""
        success, response = self.run_test(
            f"Get Session by ID: {session_id}",
            "GET",
            f"api/sessions/{session_id}",
            200
        )
        return success, response

    def test_get_sessions_by_date(self, date_str):
        """Test getting sessions by date"""
        success, response = self.run_test(
            f"Get Sessions by Date: {date_str}",
            "GET",
            f"api/sessions/date/{date_str}",
            200
        )
        if success:
            try:
                if isinstance(response, list):
                    print(f"Found {len(response)} sessions for date {date_str}")
                else:
                    print(f"Response is not a list: {response}")
            except:
                print(f"Could not determine session count: {response}")
        return success, response

    def test_get_sessions_by_week(self, start_date_str):
        """Test getting sessions by week"""
        success, response = self.run_test(
            f"Get Sessions by Week: {start_date_str}",
            "GET",
            f"api/sessions/week/{start_date_str}",
            200
        )
        if success:
            try:
                if isinstance(response, list):
                    print(f"Found {len(response)} sessions for week starting {start_date_str}")
                else:
                    print(f"Response is not a list: {response}")
            except:
                print(f"Could not determine session count: {response}")
        return success, response

    def test_get_sessions_by_month(self, year, month):
        """Test getting sessions by month"""
        success, response = self.run_test(
            f"Get Sessions by Month: {year}-{month}",
            "GET",
            f"api/sessions/month/{year}/{month}",
            200
        )
        if success:
            try:
                if isinstance(response, list):
                    print(f"Found {len(response)} sessions for month {year}-{month}")
                else:
                    print(f"Response is not a list: {response}")
            except:
                print(f"Could not determine session count: {response}")
        return success, response

    def test_get_group_sessions(self):
        """Test getting all group sessions"""
        success, response = self.run_test(
            "Get All Group Sessions",
            "GET",
            "api/group-sessions",
            200
        )
        if success:
            try:
                if isinstance(response, list):
                    print(f"Found {len(response)} group sessions")
                else:
                    print(f"Response is not a list: {response}")
            except:
                print(f"Could not determine session count: {response}")
        return success, response

    def test_get_individual_sessions(self):
        """Test getting all individual sessions"""
        success, response = self.run_test(
            "Get All Individual Sessions",
            "GET",
            "api/individual-sessions",
            200
        )
        if success:
            try:
                if isinstance(response, list):
                    print(f"Found {len(response)} individual sessions")
                else:
                    print(f"Response is not a list: {response}")
            except:
                print(f"Could not determine session count: {response}")
        return success, response
        
    def test_get_session_data(self, session_id):
        """Test getting session data for a specific session"""
        success, response = self.run_test(
            f"Get Session Data for Session ID: {session_id}",
            "GET",
            f"api/sessions/{session_id}/data",
            200
        )
        return success, response
        
    def test_update_session_data(self, session_id, student_id, data):
        """Test updating session data for a specific student in a session"""
        success, response = self.run_test(
            f"Update Session Data for Student ID: {student_id} in Session ID: {session_id}",
            "PUT",
            f"api/sessions/{session_id}/data/{student_id}",
            200,
            data=data
        )
        return success, response
        
    def test_add_trial_data(self, session_id, student_id, goal_id, was_correct):
        """Test adding trial data for a specific goal"""
        success, response = self.run_test(
            f"Add Trial Data for Goal ID: {goal_id}, Student ID: {student_id}, Session ID: {session_id}",
            "POST",
            f"api/sessions/{session_id}/trial",
            201,
            data={
                "student_id": student_id,
                "goal_id": goal_id,
                "was_correct": was_correct
            }
        )
        return success, response
        
    def test_update_behavior_data(self, session_id, student_id, behavior_data):
        """Test updating behavior data for a specific student in a session"""
        success, response = self.run_test(
            f"Update Behavior Data for Student ID: {student_id} in Session ID: {session_id}",
            "PUT",
            f"api/sessions/{session_id}/behavior/{student_id}",
            200,
            data=behavior_data
        )
        return success, response

def main():
    # Setup
    tester = AchieveAPITester()
    today = datetime.now().strftime('%Y-%m-%d')
    current_year = datetime.now().year
    current_month = datetime.now().month
    
    # Run tests
    print("\n===== Testing Achieve API Schedule Functionality =====\n")
    
    # Test login (may not be required for public endpoints)
    login_success = tester.test_login()
    if not login_success:
        print("❌ Login failed or not implemented, continuing without authentication")
    
    # Test getting all sessions
    sessions_success, sessions_data = tester.test_get_sessions()
    
    # If we have sessions, test getting one by ID
    if sessions_success and isinstance(sessions_data, list) and len(sessions_data) > 0:
        try:
            session_id = sessions_data[0]['id']
            tester.test_get_session_by_id(session_id)
        except:
            print("❌ Could not extract session ID from response")
    
    # Test getting sessions by date
    tester.test_get_sessions_by_date(today)
    
    # Test getting sessions by week
    tester.test_get_sessions_by_week(today)
    
    # Test getting sessions by month
    tester.test_get_sessions_by_month(current_year, current_month)
    
    # Test getting group sessions
    tester.test_get_group_sessions()
    
    # Test getting individual sessions
    tester.test_get_individual_sessions()
    
    # Print results
    print(f"\n📊 Tests passed: {tester.tests_passed}/{tester.tests_run}")
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())