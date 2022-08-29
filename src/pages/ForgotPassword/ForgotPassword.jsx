function ForgotPassword() {
    return (
        <div class="flex items-center justify-center h-screen bg-white">
            <div class="bg-white rounded-2xl border shadow-xl p-10 max-w-lg">
                <div class="flex flex-col items-center space-y-4">
                    <h1 class="font-bold text-2xl text-gray-700 w-full text-center">
                        Reset Password
                    </h1>
                    <p class="text-sm text-gray-500 text-center w-5/6">
                        You forget your password ? Please enter your email
                    </p>
                    <input
                        type="email"
                        placeholder="Email"
                        class="border-2 rounded-lg w-full h-12 px-4"
                    />
                    <button
                        class="bg-red-400 text-white rounded-md hover:bg-red-500 font-semibold px-4 py-3 w-full"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;