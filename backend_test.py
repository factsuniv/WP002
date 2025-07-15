#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for QOFA (Quantum Options Flow Analysis)
Tests all API endpoints and validates quantum analysis functionality
"""

import requests
import json
import time
import sys
from datetime import datetime
from typing import Dict, List, Any
import numpy as np

class QOFABackendTester:
    def __init__(self):
        # Get backend URL from frontend .env file
        try:
            with open('/app/frontend/.env', 'r') as f:
                env_content = f.read()
                for line in env_content.split('\n'):
                    if line.startswith('REACT_APP_BACKEND_URL='):
                        self.base_url = line.split('=', 1)[1].strip()
                        break
                else:
                    raise ValueError("REACT_APP_BACKEND_URL not found in .env")
        except Exception as e:
            print(f"❌ Error reading backend URL from .env: {e}")
            sys.exit(1)
        
        self.api_url = f"{self.base_url}/api"
        self.session = requests.Session()
        self.session.headers.update({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })
        
        print(f"🔧 Testing backend at: {self.api_url}")
        
    def test_health_check(self) -> bool:
        """Test the main API health check endpoint"""
        print("\n📋 Testing Health Check Endpoint...")
        try:
            response = self.session.get(f"{self.api_url}/")
            
            if response.status_code == 200:
                data = response.json()
                if "QOFA" in data.get("message", "") and data.get("version"):
                    print(f"✅ Health check passed: {data['message']}")
                    return True
                else:
                    print(f"❌ Health check failed: Invalid response format")
                    return False
            else:
                print(f"❌ Health check failed: Status {response.status_code}")
                return False
                
        except Exception as e:
            print(f"❌ Health check failed: {e}")
            return False
    
    def test_whitepaper_endpoint(self) -> bool:
        """Test the whitepaper content endpoint"""
        print("\n📄 Testing Whitepaper Endpoint...")
        try:
            response = self.session.get(f"{self.api_url}/whitepaper")
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ['title', 'authors', 'abstract', 'mathematical_framework']
                
                for field in required_fields:
                    if field not in data:
                        print(f"❌ Whitepaper missing field: {field}")
                        return False
                
                if "Quantum Options Flow Analysis" in data.get('title', ''):
                    print(f"✅ Whitepaper endpoint working - Title: {data['title'][:50]}...")
                    return True
                else:
                    print(f"❌ Whitepaper content invalid")
                    return False
            else:
                print(f"❌ Whitepaper endpoint failed: Status {response.status_code}")
                return False
                
        except Exception as e:
            print(f"❌ Whitepaper endpoint failed: {e}")
            return False
    
    def test_whitepaper_markdown(self) -> bool:
        """Test the whitepaper markdown endpoint"""
        print("\n📝 Testing Whitepaper Markdown Endpoint...")
        try:
            response = self.session.get(f"{self.api_url}/whitepaper/markdown")
            
            if response.status_code == 200:
                data = response.json()
                
                if 'content' in data and 'format' in data:
                    content = data['content']
                    if "# Quantum Options Flow Analysis" in content and len(content) > 1000:
                        print(f"✅ Whitepaper markdown working - Length: {len(content)} chars")
                        return True
                    else:
                        print(f"❌ Whitepaper markdown content invalid")
                        return False
                else:
                    print(f"❌ Whitepaper markdown missing required fields")
                    return False
            else:
                print(f"❌ Whitepaper markdown failed: Status {response.status_code}")
                return False
                
        except Exception as e:
            print(f"❌ Whitepaper markdown failed: {e}")
            return False
    
    def test_quantum_metrics(self) -> bool:
        """Test the quantum metrics endpoint"""
        print("\n⚛️ Testing Quantum Metrics Endpoint...")
        try:
            response = self.session.get(f"{self.api_url}/quantum-metrics")
            
            if response.status_code == 200:
                data = response.json()
                required_metrics = ['planck_constant', 'decoherence_time', 'entanglement_threshold', 
                                  'n_basis_states', 'coherence_decay_rate', 'system_status']
                
                for metric in required_metrics:
                    if metric not in data:
                        print(f"❌ Quantum metrics missing: {metric}")
                        return False
                
                # Validate metric values
                if (data['planck_constant'] > 0 and 
                    data['decoherence_time'] > 0 and 
                    0 < data['entanglement_threshold'] < 1 and
                    data['n_basis_states'] > 0):
                    print(f"✅ Quantum metrics working - Status: {data['system_status']}")
                    return True
                else:
                    print(f"❌ Quantum metrics have invalid values")
                    return False
            else:
                print(f"❌ Quantum metrics failed: Status {response.status_code}")
                return False
                
        except Exception as e:
            print(f"❌ Quantum metrics failed: {e}")
            return False
    
    def test_sample_data_generation(self) -> bool:
        """Test the sample data generation endpoint"""
        print("\n🎲 Testing Sample Data Generation...")
        try:
            response = self.session.get(f"{self.api_url}/demo/generate-sample-data")
            
            if response.status_code == 200:
                data = response.json()
                
                # Check if we have sample data for multiple symbols
                expected_symbols = ["AAPL", "GOOGL", "MSFT", "TSLA", "SPY"]
                
                for symbol in expected_symbols:
                    if symbol not in data:
                        print(f"❌ Sample data missing symbol: {symbol}")
                        return False
                    
                    symbol_data = data[symbol]
                    if not all(key in symbol_data for key in ['prices', 'volumes', 'symbol']):
                        print(f"❌ Sample data for {symbol} missing required fields")
                        return False
                    
                    if len(symbol_data['prices']) != len(symbol_data['volumes']):
                        print(f"❌ Sample data for {symbol} has mismatched array lengths")
                        return False
                
                print(f"✅ Sample data generation working - Generated data for {len(data)} symbols")
                return True
            else:
                print(f"❌ Sample data generation failed: Status {response.status_code}")
                return False
                
        except Exception as e:
            print(f"❌ Sample data generation failed: {e}")
            return False
    
    def test_quantum_flow_analysis(self) -> bool:
        """Test the quantum flow analysis endpoint"""
        print("\n🌊 Testing Quantum Flow Analysis...")
        try:
            # Generate realistic sample market data
            sample_data = {
                "symbol": "AAPL",
                "price_data": [150.0, 151.2, 149.8, 152.1, 150.9, 153.4, 152.0, 154.2, 153.1, 155.0],
                "volume_data": [1000000, 1200000, 800000, 1500000, 900000, 1800000, 1100000, 2000000, 1300000, 1600000]
            }
            
            response = self.session.post(f"{self.api_url}/analyze/quantum-flow", 
                                       json=sample_data)
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ['signals', 'confidence', 'quantum_metrics', 'timestamp']
                
                for field in required_fields:
                    if field not in data:
                        print(f"❌ Quantum flow analysis missing field: {field}")
                        return False
                
                # Validate quantum metrics
                quantum_metrics = data['quantum_metrics']
                required_metrics = ['coherence_time', 'entanglement_threshold', 'quantum_correlation', 'signal_count']
                
                for metric in required_metrics:
                    if metric not in quantum_metrics:
                        print(f"❌ Quantum flow analysis missing metric: {metric}")
                        return False
                
                # Validate confidence is between 0 and 1
                confidence = data['confidence']
                if not (0 <= confidence <= 1):
                    print(f"❌ Quantum flow analysis invalid confidence: {confidence}")
                    return False
                
                print(f"✅ Quantum flow analysis working - Confidence: {confidence:.3f}, Signals: {len(data['signals'])}")
                return True
            else:
                print(f"❌ Quantum flow analysis failed: Status {response.status_code}")
                return False
                
        except Exception as e:
            print(f"❌ Quantum flow analysis failed: {e}")
            return False
    
    def test_entanglement_analysis(self) -> bool:
        """Test the quantum entanglement analysis endpoint"""
        print("\n🔗 Testing Quantum Entanglement Analysis...")
        try:
            sample_request = {
                "symbols": ["AAPL", "GOOGL", "MSFT"],
                "analysis_type": "entanglement"
            }
            
            response = self.session.post(f"{self.api_url}/analyze/entanglement", 
                                       json=sample_request)
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ['entanglement_entropy', 'entanglement_matrix', 'symbols', 'analysis_type', 'timestamp']
                
                for field in required_fields:
                    if field not in data:
                        print(f"❌ Entanglement analysis missing field: {field}")
                        return False
                
                # Validate entanglement entropy is a valid number
                entropy = data['entanglement_entropy']
                if not isinstance(entropy, (int, float)) or entropy < 0:
                    print(f"❌ Entanglement analysis invalid entropy: {entropy}")
                    return False
                
                # Validate symbols match request
                if data['symbols'] != sample_request['symbols']:
                    print(f"❌ Entanglement analysis symbols mismatch")
                    return False
                
                print(f"✅ Entanglement analysis working - Entropy: {entropy:.3f}, Matrix size: {len(data['entanglement_matrix'])}")
                return True
            else:
                print(f"❌ Entanglement analysis failed: Status {response.status_code}")
                return False
                
        except Exception as e:
            print(f"❌ Entanglement analysis failed: {e}")
            return False
    
    def test_risk_assessment(self) -> bool:
        """Test the quantum risk assessment endpoint"""
        print("\n⚠️ Testing Quantum Risk Assessment...")
        try:
            sample_portfolio = {
                "AAPL": 0.4,
                "GOOGL": 0.3,
                "MSFT": 0.2,
                "TSLA": 0.1
            }
            
            response = self.session.post(f"{self.api_url}/analyze/risk-assessment", 
                                       json=sample_portfolio)
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ['risk_metrics', 'portfolio', 'market_conditions', 'timestamp']
                
                for field in required_fields:
                    if field not in data:
                        print(f"❌ Risk assessment missing field: {field}")
                        return False
                
                # Validate risk metrics
                risk_metrics = data['risk_metrics']
                required_metrics = ['quantum_risk', 'diversification_ratio', 'entanglement_risk', 'decoherence_time']
                
                for metric in required_metrics:
                    if metric not in risk_metrics:
                        print(f"❌ Risk assessment missing metric: {metric}")
                        return False
                
                # Validate portfolio matches input
                if data['portfolio'] != sample_portfolio:
                    print(f"❌ Risk assessment portfolio mismatch")
                    return False
                
                quantum_risk = risk_metrics['quantum_risk']
                print(f"✅ Risk assessment working - Quantum Risk: {quantum_risk:.3f}")
                return True
            else:
                print(f"❌ Risk assessment failed: Status {response.status_code}")
                return False
                
        except Exception as e:
            print(f"❌ Risk assessment failed: {e}")
            return False
    
    def test_mathematical_calculations(self) -> bool:
        """Test that mathematical calculations are producing reasonable results"""
        print("\n🧮 Testing Mathematical Calculations...")
        try:
            # Test quantum flow analysis with known data patterns
            test_cases = [
                {
                    "name": "Trending Up",
                    "price_data": [100, 101, 102, 103, 104, 105, 106, 107, 108, 109],
                    "volume_data": [1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900]
                },
                {
                    "name": "High Volatility",
                    "price_data": [100, 95, 105, 90, 110, 85, 115, 80, 120, 75],
                    "volume_data": [1000, 2000, 1500, 3000, 1200, 4000, 1800, 5000, 2200, 6000]
                }
            ]
            
            results = []
            for test_case in test_cases:
                sample_data = {
                    "symbol": "TEST",
                    "price_data": test_case["price_data"],
                    "volume_data": test_case["volume_data"]
                }
                
                response = self.session.post(f"{self.api_url}/analyze/quantum-flow", json=sample_data)
                
                if response.status_code == 200:
                    data = response.json()
                    confidence = data['confidence']
                    quantum_correlation = data['quantum_metrics']['quantum_correlation']
                    
                    results.append({
                        'name': test_case['name'],
                        'confidence': confidence,
                        'correlation': quantum_correlation
                    })
                    
                    print(f"  📊 {test_case['name']}: Confidence={confidence:.3f}, Correlation={quantum_correlation:.3f}")
                else:
                    print(f"❌ Mathematical test failed for {test_case['name']}")
                    return False
            
            # Validate results are reasonable
            if len(results) == 2:
                # High volatility should generally have different metrics than trending
                vol_confidence = next(r['confidence'] for r in results if r['name'] == 'High Volatility')
                trend_confidence = next(r['confidence'] for r in results if r['name'] == 'Trending Up')
                
                if 0 <= vol_confidence <= 1 and 0 <= trend_confidence <= 1:
                    print(f"✅ Mathematical calculations producing reasonable results")
                    return True
                else:
                    print(f"❌ Mathematical calculations producing invalid results")
                    return False
            else:
                print(f"❌ Mathematical calculations incomplete")
                return False
                
        except Exception as e:
            print(f"❌ Mathematical calculations test failed: {e}")
            return False
    
    def run_comprehensive_test(self) -> Dict[str, bool]:
        """Run all tests and return results"""
        print("🚀 Starting Comprehensive QOFA Backend Testing")
        print("=" * 60)
        
        test_results = {}
        
        # Core API tests
        test_results['health_check'] = self.test_health_check()
        test_results['whitepaper'] = self.test_whitepaper_endpoint()
        test_results['whitepaper_markdown'] = self.test_whitepaper_markdown()
        test_results['quantum_metrics'] = self.test_quantum_metrics()
        test_results['sample_data'] = self.test_sample_data_generation()
        
        # Quantum analysis tests
        test_results['quantum_flow'] = self.test_quantum_flow_analysis()
        test_results['entanglement'] = self.test_entanglement_analysis()
        test_results['risk_assessment'] = self.test_risk_assessment()
        
        # Mathematical validation
        test_results['mathematical_calculations'] = self.test_mathematical_calculations()
        
        return test_results
    
    def print_summary(self, results: Dict[str, bool]):
        """Print test summary"""
        print("\n" + "=" * 60)
        print("📊 QOFA Backend Test Summary")
        print("=" * 60)
        
        passed = sum(results.values())
        total = len(results)
        
        for test_name, result in results.items():
            status = "✅ PASS" if result else "❌ FAIL"
            print(f"{test_name.replace('_', ' ').title():<30} {status}")
        
        print("-" * 60)
        print(f"Total Tests: {total}")
        print(f"Passed: {passed}")
        print(f"Failed: {total - passed}")
        print(f"Success Rate: {(passed/total)*100:.1f}%")
        
        if passed == total:
            print("\n🎉 All tests passed! QOFA backend is fully functional.")
        else:
            print(f"\n⚠️ {total - passed} test(s) failed. Please check the issues above.")
        
        return passed == total

def main():
    """Main test execution"""
    tester = QOFABackendTester()
    results = tester.run_comprehensive_test()
    success = tester.print_summary(results)
    
    # Return appropriate exit code
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()