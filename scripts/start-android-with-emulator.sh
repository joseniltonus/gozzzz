#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

export JAVA_HOME="${JAVA_HOME:-$HOME/Android/jdk-17-temurin/Contents/Home}"
export ANDROID_HOME="${ANDROID_HOME:-$HOME/Android/Sdk}"
export ANDROID_SDK_ROOT="$ANDROID_HOME"
export PATH="$JAVA_HOME/bin:$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools:$ANDROID_HOME/cmdline-tools/latest/bin:$PATH"

count_adb_devices() {
  adb devices 2>/dev/null | awk '/\tdevice$/ {c++} END {print c+0}'
}

DEVICE_COUNT="$(count_adb_devices)"

if [[ "${DEVICE_COUNT}" -eq 0 ]]; then
  AVD_NAME="ExpoGoZzzz"
  if ! "$ANDROID_HOME/emulator/emulator" -list-avds | grep -qx "$AVD_NAME"; then
    echo "AVD \"${AVD_NAME}\" not found. Create it with Android Studio Device Manager or run sdkmanager + avdmanager once."
    exit 1
  fi
  echo "No Android device detected — starting emulator \"${AVD_NAME}\" (first boot can take a few minutes)..."
  "$ANDROID_HOME/emulator/emulator" -avd "$AVD_NAME" -no-audio -no-boot-anim &
  echo "Waiting for adb..."
  for _ in $(seq 1 180); do
    DEVICE_COUNT="$(count_adb_devices)"
    if [[ "${DEVICE_COUNT}" -ge 1 ]]; then
      break
    fi
    sleep 2
  done
  if [[ "${DEVICE_COUNT}" -eq 0 ]]; then
    echo "Emulator did not appear in adb in time. Check System Settings → Developer / virtualization, or open Android Studio once."
    exit 1
  fi
  echo "Waiting for Android to finish booting..."
  for _ in $(seq 1 150); do
    BOOT="$(adb shell getprop sys.boot_completed 2>/dev/null | tr -d '\r' || echo 0)"
    if [[ "$BOOT" == "1" ]]; then
      break
    fi
    sleep 2
  done
fi

export EXPO_NO_TELEMETRY=1
exec npx expo start --android "$@"
