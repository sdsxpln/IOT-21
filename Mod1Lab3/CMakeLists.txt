cmake_minimum_required(VERSION 2.8.11)

if (CMAKE_C_COMPILER_ID STREQUAL "GNU")
  set (CMAKE_C_FLAGS "--std=c99 -g ${CMAKE_C_FLAGS}")
endif()

set(SOURCE main.c wiring.h)
add_executable(app ${SOURCE})

if (CMAKE_SYSTEM_PROCESSOR MATCHES "^arm")
  target_link_libraries(app wiringPi)
else()
  target_link_libraries(app)
endif()