/*
    Coded by Darko Lukic <lukicdarkoo@gmail.com>
    Node.js and C++ bindings with events (EventEmitter)
*/

#include <nan.h>
#include <iostream>

using v8::Local;
using v8::FunctionTemplate;
using v8::Object;
using v8::Value;
using v8::Handle;
using v8::Isolate;
using v8::Exception;
using v8::Persistent;
using v8::Context;
using namespace std;

class Robot : public Nan::ObjectWrap {
	public:
		static void Init(Local<Object> exports) {
			Nan::HandleScope scope;

			Local<FunctionTemplate> tmpl = Nan::New<FunctionTemplate>(New);
			tmpl->InstanceTemplate()->SetInternalFieldCount(1);

			Nan::SetPrototypeMethod(tmpl, "getX", getX);
			Nan::SetPrototypeMethod(tmpl, "setX", setX);

			exports->Set(Nan::New("Robot").ToLocalChecked(), tmpl->GetFunction());
		}

		static void New(const Nan::FunctionCallbackInfo<Value>& args) {
			Nan::HandleScope scope;

			Robot *robot = new Robot();
			robot->Wrap(args.This());

			args.GetReturnValue().Set(args.This());
		}

		Robot() : x(0) {}

		Persistent<Object> obj;
	
	private:


		static void getX(const Nan::FunctionCallbackInfo<Value>& args) {
			Nan::HandleScope scope;

			Robot *robot = ObjectWrap::Unwrap<Robot>(args.Holder());

			args.GetReturnValue().Set(robot->x++);
		}

		static void setX(const Nan::FunctionCallbackInfo<Value>& args) {
			Nan::HandleScope scope;

			Robot *robot = ObjectWrap::Unwrap<Robot>(args.Holder());

			// Set x
			if (args.Length() != 1 || args[0]->IsInt32() == false) {
				args.GetIsolate()->ThrowException(Exception::TypeError(
					Nan::New("Function requires one argument").ToLocalChecked()
				));
				return;
			}
			else {
				robot->x = args[0]->Int32Value();
			}

            (robot->obj).Reset(args.GetIsolate(), args.Holder());


			// Fire event
			Handle<Value> argv[] = {
				Nan::New("positionChanged").ToLocalChecked(),
				Nan::New(robot->x)
			};

			Nan::MakeCallback(Nan::New(robot->obj), "emit", 2, argv);
		}

		int x;
};

NODE_MODULE(Robot, Robot::Init)