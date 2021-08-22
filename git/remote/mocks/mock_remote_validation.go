// Code generated by MockGen. DO NOT EDIT.
// Source: git/remote/remote_validation.go

// Package mocks is a generated GoMock package.
package mocks

import (
	reflect "reflect"

	gomock "github.com/golang/mock/gomock"
)

// MockValidation is a mock of Validation interface.
type MockValidation struct {
	ctrl     *gomock.Controller
	recorder *MockValidationMockRecorder
}

// MockValidationMockRecorder is the mock recorder for MockValidation.
type MockValidationMockRecorder struct {
	mock *MockValidation
}

// NewMockValidation creates a new mock instance.
func NewMockValidation(ctrl *gomock.Controller) *MockValidation {
	mock := &MockValidation{ctrl: ctrl}
	mock.recorder = &MockValidationMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use.
func (m *MockValidation) EXPECT() *MockValidationMockRecorder {
	return m.recorder
}

// ValidateRemoteFields mocks base method.
func (m *MockValidation) ValidateRemoteFields(remoteFields ...string) error {
	m.ctrl.T.Helper()
	varargs := []interface{}{}
	for _, a := range remoteFields {
		varargs = append(varargs, a)
	}
	ret := m.ctrl.Call(m, "ValidateRemoteFields", varargs...)
	ret0, _ := ret[0].(error)
	return ret0
}

// ValidateRemoteFields indicates an expected call of ValidateRemoteFields.
func (mr *MockValidationMockRecorder) ValidateRemoteFields(remoteFields ...interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "ValidateRemoteFields", reflect.TypeOf((*MockValidation)(nil).ValidateRemoteFields), remoteFields...)
}
