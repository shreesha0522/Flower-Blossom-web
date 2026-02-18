import { NextResponse } from 'next/server';
import { getUserData } from '@/lib/cookie';

export async function GET() {
  try {
    const userData = await getUserData();

    if (!userData) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    return NextResponse.json(userData);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to get user data' },
      { status: 500 }
    );
  }
}