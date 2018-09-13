#include <iostream>
#include <fstream>
#include <iomanip>
#include <string>
#include <math.h>
#include <random>
#include "nn_class/Nn.h"
using namespace std;

void normalize_data(float v[784])
{
	for(int i = 0; i < 784; i++)
	{
		v[i] = (v[i]*2-255)/255.0;
	}
}

int main(int argc, char *argv[])
{
	float image[784];
	int big = 0;
	float *result = (float*)malloc(sizeof(float)*10);
	ifstream file;
	file.open(argv[1]);
	while(file.fail())
	{
		file.open(argv[1]);
	}
	string str;
	for(int i = 0; i < 784;i++)
	{
		getline(file,str);
		image[i] = stoi(str);
	}
	file.close();

	Nn aNet("98.28.txt");
	for(int i = 0; i < 10; i++)
	{
		result[i]=0;
	}
	normalize_data(image);
	aNet.run(image);
	aNet.results(result);
	big=0;
	for(int k = 1; k < 10;k++)
	{
		if(result[big] < result[k])
			big = k;
	}
	cout << "" << big << endl;
	aNet.destroy();
	free(result);
	return 0;
}
