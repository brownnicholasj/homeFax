import pdfMake from 'pdfmake/build/pdfmake';
import vfsFonts from 'pdfmake/build/vfs_fonts';

const _format = (data) => {
	return data.map((item) => {
		return [
			{ text: item.name },
			{ text: item.username },
			{ text: item.email },
			{ text: item.phone },
			{ text: item.website },
		];
	});
};

export default function GenerateReport(rows) {
	const { vfs } = vfsFonts.pdfMake;
	pdfMake.vfs = vfs;

	// const data = fakeData(rows);
	// const formattedData = _format(data);

	const homeFaxReport = {
		content: [
			{ text: 'HomeFax Report' },
			'\n',
			{
				table: {
					headerRows: 1,
					dontBreakRows: true,
					body: [
						[
							{ text: 'Name', style: 'tableHeader' },
							{ text: 'Username', style: 'tableHeader' },
							{ text: 'Email', style: 'tableHeader' },
							{ text: 'Phone', style: 'tableHeader' },
							{ text: 'Website', style: 'tableHeader' },
						],
						// ...formattedData,
					],
				},
			},
		],
	};

	pdfMake.createPdf(homeFaxReport).open();
}
